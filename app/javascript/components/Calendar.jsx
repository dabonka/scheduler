import React from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }

  render() {
    return (
      <div id="example-component">
      <FullCalendar
        id = "your-custom-ID"
        header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        }}
        defaultDate={new Date()}
        navLinks= {true} // can click day/week names to navigate views
        editable= {true}
        eventLimit= {true} // allow "more" link when too many events
        events = {this.state.events}	
        eventClick = {function(calEvent, jsEvent, view, resourceObj) {
          return <EditEvent />;
        }}
        />
      </div>
    );
  }

  componentDidMount(){
    fetch('/api/v1/events.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ events: data }) });
      //.then((data) => {console.log("--->", data) });
  }
}

export default Calendar;