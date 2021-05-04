import React, {Component, Fragment} from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Calendar/>
                <Home/>
            </Fragment>
        );
    }
}

export default App;

