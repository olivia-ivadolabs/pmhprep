import React, {Component} from "react";
import {Table} from "reactstrap";


class ComputedEventList extends Component {
    render() {
        const computed_events = this.props.computed_events;
        return (
            <Table light>
                <thead>
                <tr>Computed appointments</tr>
                <tr>
                    <th>Patient ID</th>
                    <th>Diagnosis ID</th>
                    <th>Cancer region</th>
                    <th>Cancer stage</th>
                    <th>Event ID</th>
                    <th>Activity type</th>
                    <th>Technique</th>
                    <th>Duration (mins)</th>
                    <th>Machine</th>
                    <th>Earliest date</th>
                    <th>Latest date</th>
                    <th>Computed earliest time</th>
                    <th>Computed latest time</th>
                </tr>
                </thead>
                <tbody>
                {!computed_events || computed_events.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>Ops, no one here yet</b>
                        </td>
                    </tr>
                ) : (
                    computed_events.map(computed_event => (
                        <tr key={computed_event.patient_id}>
                            <td>{computed_event.patient_id}</td>
                            <td>{computed_event.diagnosis_id}</td>
                            <td>{computed_event.cancer_region}</td>
                            <td>{computed_event.cancer_stage}</td>
                            <td>{computed_event.event_id}</td>
                            <td>{computed_event.activity_type}</td>
                            <td>{computed_event.technique}</td>
                            <td>{computed_event.duration_in_mins}</td>
                            <td>{computed_event.machine}</td>
                            <td>{computed_event.earliest_date}</td>
                            <td>{computed_event.latest_date}</td>
                            <td>{computed_event.computedEarliestTime}</td>
                            <td>{computed_event.computedLatestTime}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        );
    }
}

export default ComputedEventList;
