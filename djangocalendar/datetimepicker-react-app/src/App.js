import React, { useState } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';

function App() {
  const [dt, setDt] = useState(moment());
  return (
    <div className="App">
      <h2>Datetime picker in ReactJS - <a href="https://www.cluemediator.com">Clue Mediator</a></h2>
      <DatePicker
        inputProps={{
          style: { width: 250 }
        }}
        value={dt}
        dateFormat="DD-MM-YYYY"
        timeFormat="hh:mm A"
        onChange={val => setDt(val)}
      /> <br />
      <div><b>Date:</b> {dt.format('LLL')}</div>
    </div>
  );
}

export default App;