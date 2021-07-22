import React, {Component} from 'react';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios'

import Home from "./components/Home";

import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css';
import {API_ALL_EVENTS_URL} from "./constants";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

class App extends Component {

    state = {
        events: []
    };

    componentDidMount() {
        this.resetState();
    }

    getEvents = () => {
        axios.get(API_ALL_EVENTS_URL).then(res => this.setState({events: res.data}));
    };

    resetState = () => {
        this.getEvents();
    };

    constructor(props) {
        super(props)

        this.state = {
            cal_events: [
                //State is updated via componentDidMount
            ],
        }

    }

    convertDate = (date) => {
        return moment(date).toDate()
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/appointments/')
            .then(response => {
                console.log(response.data);
                let appointments = response.data;

                for (let i = 0; i < appointments.length; i++) {

                    appointments[i].start = this.convertDate(appointments[i].start_time)
                    appointments[i].end = this.convertDate(appointments[i].end_time)

                }

                this.setState({
                    cal_events: appointments
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const {cal_events} = this.state

        return (
            <div className="App" className="calendar-background">
                <header className="App-header">
                    <h1 className="App-title">Event Calendar</h1>
                </header>
                <div style={{height: 700}}>
                    <Calendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='week'
                        views={['month', 'week', 'day']}
                        defaultDate={new Date()}
                    />
                    <Home className="calendar-background"/>
                </div>
            </div>
        );
    }
}

export default App;
