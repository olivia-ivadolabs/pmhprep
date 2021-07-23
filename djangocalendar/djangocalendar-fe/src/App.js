import React, {Component} from "react";

import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from "axios"

import Home from "./components/Home";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import {API_ALL_APPOINTMENTS_URL} from "./constants";
import {API_ALL_SHIFTS_URL} from "./constants";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cal_events: [],
            cal_shifts: [],
        }

    }

    convertDate = (date) => {
        return moment(date).toDate()
    }

    componentDidMount() {
        axios.get(API_ALL_APPOINTMENTS_URL)
            .then(response => {
                console.log(response.data);
                let appointments = response.data;

                for (let i = 0; i < appointments.length; i++) {

                    appointments[i].start = this.convertDate(appointments[i].start_time)
                    appointments[i].end = this.convertDate(appointments[i].end_time)
                    appointments[i].backgroundColor = "#4287f5";

                }

                this.setState({
                    cal_events: appointments
                })

            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(API_ALL_SHIFTS_URL)
            .then(response => {
                console.log(response.data);
                let shifts = response.data;

                for (let i = 0; i < shifts.length; i++) {

                    shifts[i].start = this.convertDate(shifts[i].begin_shift)
                    shifts[i].end = this.convertDate(shifts[i].end_shift)
                    shifts[i].backgroundColor = "#a0bf6d";

                }

                this.setState({
                    cal_shifts: shifts
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }


render()
{

    const {cal_events} = this.state
    const {cal_shifts} = this.state

    return (
        <div className="App" className="calendar-background">
            <header className="App-header">
                <h1 className="App-title">Event Calendar</h1>
            </header>
            <div style={{height: 700}}>
                <Calendar
                    localizer={localizer}
                    events={cal_events.concat(cal_shifts)}
                    step={30}
                    defaultView="week"
                    views={["month", "week", "day"]}
                    defaultDate={new Date()}
                    eventPropGetter={event => ({
                        style: {
                            backgroundColor: event.backgroundColor,
                        },
                    })}

                />
                <Home className="calendar-background"/>
            </div>
        </div>
    );
}
}

export default App;
