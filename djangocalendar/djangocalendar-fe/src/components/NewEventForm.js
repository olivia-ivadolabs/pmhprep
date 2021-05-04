import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import 'react-datetime/css/react-datetime.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import DateTimePicker from 'react-datetime-picker';

import {API_ALL_EVENTS_URL} from "../constants";

class NewEventForm extends React.Component {
    state = {
        pk: 0,
        title: "",
        description: "",
        start_time: null,
        end_time: null
    };

    componentDidMount() {
        if (this.props.event) {
            const {pk, title, description, start_time, end_time} = this.props.event;
            this.setState({pk, title, description, start_time, end_time});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    createEvent = e => {
        e.preventDefault();
        axios.post(API_ALL_EVENTS_URL, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    editEvent = e => {
        e.preventDefault();
        axios.put(API_ALL_EVENTS_URL + this.state.pk, this.state).then(() => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    constructor(props) {
        super(props)
        this.state = {
            start_time: new Date(),
            end_time: new Date()
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleStartDateChange(date) {
        this.setState({
            start_time: date
        })
    }

    handleEndDateChange(date) {
        this.setState({
            end_time: date
        })
    }

    render() {
        return (
            <Form onSubmit={this.props.event ? this.editEvent : this.createEvent}>
                <FormGroup>
                    <Label for="title">Title:</Label>
                    <Input
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.title)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input
                        type="text"
                        name="description"
                        onChange={this.onChange}
                        value={this.defaultIfEmpty(this.state.description)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="start_time">Start time:</Label>
                    <DateTimePicker
                        name="start_time"
                        onChange={this.handleStartDateChange}
                        clearIcon={null}
                        value={this.defaultIfEmpty(new Date(this.state.start_time))}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="end_time">End time:</Label>
                    <DateTimePicker
                        name="end_time"
                        onChange={this.handleEndDateChange}
                        clearIcon={null}
                        value={this.defaultIfEmpty(new Date(this.state.end_time))}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default NewEventForm;