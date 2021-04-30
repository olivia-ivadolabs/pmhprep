import React, { Component } from "react";
import { Table } from "reactstrap";
import NewEventModal from "./NewEventModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class EventList extends Component {
  render() {
    const events = this.props.events;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
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
                <td>{event.description}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
                <td align="center">
                  <NewEventModal
                    create={false}
                    event={event}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={event.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default EventList;
