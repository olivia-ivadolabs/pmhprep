import React, { Component } from "react";
import { Table } from "reactstrap";


class EventList extends Component {
  render() {
    const events = this.props.events;
    return (
      <Table light>
        <thead>
        <tr>Scheduled appointments</tr>
          <tr>
            <th>Title</th>
            <th>Start time</th>
            <th>End time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!events || events.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            events.map(event => (
              <tr key={event.pk}>
                <td>{event.title}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default EventList;
