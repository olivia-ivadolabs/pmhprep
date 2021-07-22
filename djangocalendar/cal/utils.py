from datetime import datetime
from typing import Tuple, List

from neomodel import db


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
            WITH m, collect(ts) AS tsAvailable
            MATCH (t0:TimeSlot)-[:NEXT]->(t1:TimeSlot)
            MATCH p = (t1)-[:NEXT*]->(t2:TimeSlot)
            MATCH (t2)-[:NEXT]->(t3:TimeSlot)
            WHERE ALL(n IN nodes(p) WHERE n IN tsAvailable)
             AND NOT t0 IN tsAvailable
             AND NOT t3 IN tsAvailable
            RETURN datetime(t1.start) AS beginShift, datetime(t2.end) AS endShift
        """,
    )
    return [({"begin_shift": bs.to_native(), "end_shift": es.to_native()}) for bs, es in results]


# def fetch_patient_info():
#     results, _ = db.cypher_query(
#     f"""
#         match(p: Patient) optional
#         match(c: Cancer) < -[: OF]-(d:Diagnosis) < -[: HAS]-(p)
#         return c, collect(d), collect(p)
#     """,
#     )