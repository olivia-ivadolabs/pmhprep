from datetime import datetime
from typing import Tuple, List

from neomodel import db


# Ideally we want to put the db connect info in settings.py.
# For some reason it didn't work so we put it here to connect to db.
def connect_to_db():
    db.set_connection("bolt://neo4j:password@localhost:7687")


def fetch_appointments() -> List[Tuple[int, str, datetime, datetime]]:
    """
    Cypher query to fetch all appointments.

    Returns
    -------
    The key and time for the appointments.
    """

    results, _ = db.cypher_query(
        f"""
            MATCH (e:Event)-[:SCHEDULED]->(a:Appointment)-[:AT]->(t:TimeSlot)
            RETURN ID(a), a.key, min(datetime(t.start)) AS start_time, max(datetime(t.end)) AS end_time
            ORDER BY start_time
        """,
    )
    return [({"pk": i, "title": a, "start_time": s.to_native(), "end_time": e.to_native()})
            for i, a, s, e in results]


def fetch_begin_and_end_shift(start_date: str, end_date: str
                              ) -> List[Tuple[datetime, datetime]]:
    """
    Cypher query to fetch begin and end shift timeslots for each day.

    Parameters
    ----------
    start_date: the specific day for the shifts
    end_date: the specific day for the shifts

    Returns
    -------
    The start_shift and end_shift of each shift of the machine
    """

    results, _ = db.cypher_query(
        f"""
            WITH date("{start_date}") AS startDate, date("{end_date}") AS endDate
            WITH startDate, duration.indays(startDate, endDate) AS daysInBetween
            WITH startDate, range(0, daysInBetween.days) AS daysList
            UNWIND daysList AS dayNum
            WITH startDate + duration({{days: dayNum}}) AS eachDate
            MATCH (m:Machine)-[:AT]->(ts:TimeSlot)
            WHERE date(datetime(ts.start)) = eachDate
            WITH m, collect(ts) AS tsAvilable
            MATCH (t0:TimeSlot)-[:NEXT]->(t1:TimeSlot)
            MATCH p = (t1)-[:NEXT*]->(t2:TimeSlot)
            MATCH (t2)-[:NEXT]->(t3:TimeSlot)
            WHERE ALL(n IN nodes(p) WHERE n IN tsAvailable)
             AND NOT t0 IN tsAvailable
             AND NOT t3 IN tsAvailable
            RETURN datetime(t1.start) AS beginShift, datetime(t2.end) AS endShift
        """,
    )
    return [({"title": "Time shift", "begin_shift": bs.to_native(), "end_shift": es.to_native()}) for bs, es in results]


def fetch_computed_appointment_time(earliest: str, latest: str
                                    ) -> List[Tuple[str, str, str, int, str, str, str, int,
                                                    str, str, str, datetime, datetime]]:
    """
    Cypher query to fetch computed appointment time slots for unscheduled events.
    Need to add ignored_appointments in the future.

    Parameters
    ----------
    earliest: the earliest time for scheduling the event
    latest: the latest time for scheduling the event

    Returns
    -------
    The table as in jira ticket: https://ivado-labs.atlassian.net/browse/DRMAR-81
    """

    results, _ = db.cypher_query(
        f"""
            MATCH (p:Patient)-[:HAS]->(d:Diagnosis)-[:REQUIRES]->(e:Event)-[:REQUIRES]->(t:Technic)<-[:IS_ABLE_TO]
            -(m:Machine)-[:AT]->(ts:TimeSlot),
            (d)-[:OF]->(c:Cancer),
            (e)-[:IS]->(a:Activity)
            WHERE DATE(DATETIME(ts.start)) >= DATE("{earliest}")
             AND DATE(DATETIME(ts.end)) <= DATE("{latest}")
            WITH d,p,e,t,m,c,a,collect(ts) AS availableTs
            MATCH timeslot = (t1:TimeSlot)-[:NEXT*0..]->(t2 :TimeSlot)
            WHERE ALL(n in nodes(timeslot) where n in availableTs)
            // Below is to compare if remove the duration of the event itself, 
            // whether the rest of time is less than 15min.
             AND localdatetime() 
             < (localdatetime()
             + DURATION.between(DATETIME(t1.start), DATETIME(t2.end))
             - DURATION({{minutes:e.duration}}))
             < (localdatetime() + DURATION.between(DATETIME(t1.start), DATETIME(t1.end)))
             RETURN p.key AS patientId, d.key AS diagnosisId, c.region AS cancerRegion, c.stage AS cancerStage, 
             e.key AS eventId, a.type AS activityType, t.name AS technique, e.duration AS durationInMins, 
             m.name AS machine, datetime(t1.start) AS computedEarliestTime, datetime(t2.end) AS computedLatestTime
        """,
    )
    return [({
        "patient_id": patientId,
        "diagnosis_id": diagnosisId,
        "cancer_region": cancerRegion,
        "cancer_stage": cancerStage,
        "event_id": eventId,
        "activity_type": activityType,
        "technique": technique,
        "duration_in_mins": durationInMins,
        "machine": machine,
        "earliest_date": earliest,
        "latest_date": latest,
        "computedEarliestTime": computedEarliestTime.to_native(),
        "computedLatestTime": computedLatestTime.to_native()
    }) for patientId,
           diagnosisId,
           cancerRegion,
           cancerStage,
           eventId,
           activityType,
           technique,
           durationInMins,
           machine,
           computedEarliestTime,
           computedLatestTime in results]


# This function is to fetch the patient information. In future we wil need to fetch the unscheduled patients'
# information and add WHERE statements as filters. We will update the query below and the function accordingly.

# def fetch_patient_info():
#     results, _ = db.cypher_query(
#     f"""
#         match(p: Patient) optional
#         match(c: Cancer) < -[: OF]-(d:Diagnosis) < -[: HAS]-(p)
#         return c, collect(d), collect(p)
#     """,
#     )
