import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import EventList from "./EventList";

import axios from "axios";

import {API_ALL_COMPUTED_APPOINTMENT_TIME_URL, API_ALL_APPOINTMENTS_URL} from "../constants";
import ComputedEventList from "./ComputedEventList";

class Home extends Component {
  state = {
    events: [],
    computed_events: []
  };

  componentDidMount() {
    this.resetState();
  }

  getEvents = () => {
    axios.get(API_ALL_APPOINTMENTS_URL).then(res => this.setState({ events: res.data }));
    axios.get(API_ALL_COMPUTED_APPOINTMENT_TIME_URL).then(res => this.setState({ computed_events: res.data }));
  };

  resetState = () => {
    this.getEvents();
  };

  render() {
    return (
      <Container style={{ marginTop: "40px" }}>
        <Row>
          {/* Comment it for now. If we need to display the scheduled appointments, just uncomment below codes.*/}
          {/*<Col>*/}
          {/*  <EventList*/}
          {/*    events={this.state.events}*/}
          {/*    resetState={this.resetState}*/}
          {/*  />*/}
          {/*</Col>*/}
          <Col>
            <ComputedEventList
              computed_events={this.state.computed_events}
              resetState={this.resetState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
