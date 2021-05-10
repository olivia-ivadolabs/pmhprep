import React, {Component} from 'react';

import {Calendar, momentLocalizer} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import axios from 'axios'

import Home from "./components/Home";

import "react-big-calendar/lib/css/react-big-calendar.css";
import './App.css';
import {API_ALL_EVENTS_URL} from "./constants";
import WithPortal from "./components/DnDTable/with-portal";
import {quotes} from "./data";
import TaskApp from "./components/MultiDrag";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

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

        this.moveEvent = this.moveEvent.bind(this);
    }

    convertDate = (date) => {
        return moment.utc(date).toDate()
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/events/')
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

    moveEvent({event, start, end}) {
        const {cal_events} = this.state;

        console.log('events:', this.state)
        const idx = cal_events.indexOf(event);
        const updatedEvent = {...event, start, end};

        const nextEvents = [...cal_events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            cal_events: nextEvents
        });
    }

    resizeEvent = (resizeType, {event, start, end}) => {
        const {cal_events} = this.state;

        const nextEvents = cal_events.map(existingEvent => {
            return existingEvent.id == event.id
                ? {...existingEvent, start, end}
                : existingEvent;
        });

        this.setState({
            events: nextEvents
        });
    };


    render() {

        const {cal_events} = this.state

        return (
            <div className="App" className="calendar-background">
                <header className="App-header">
                    <h1 className="App-title">Event Calendar</h1>
                </header>
                <div style={{height: 700}}>
                    <DragAndDropCalendar
                        localizer={localizer}
                        events={cal_events}
                        step={30}
                        defaultView='week'
                        views={['month', 'week', 'day']}
                        defaultDate={new Date()}
                        selectable
                        onEventDrop={this.moveEvent}
                        resizable
                        onEventResize={this.resizeEvent}
                    />
                    <Home className="calendar-background"/>
                    <div style={{
                        borderTop: "2px solid #ADD8E6 ",
                        marginTop: 40,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 40
                    }}></div>
                    <div className='rowC'>
                        <div className='colC'>
                            <WithPortal initial={quotes}/>
                        </div>
                        <div className='colC'>
                            <TaskApp/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
