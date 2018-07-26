import React from 'react';
import {render} from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import EditEvent from './EditEvent'

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null,
      showModalWindow: false,
      eventData: null,
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
        eventClick = {(calEvent) => {
          this.setState({ eventData: calEvent})
          this.setState({ showModalWindow: true})
        }}
      />
      
      {this.state.showModalWindow ? <EditEvent editedEvent = { this.state.eventData } /> : null }
      
      </div>
    );
  }

  componentDidMount(){
    fetch('/api/v1/events.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ events: data }) });
  }
}

export default Calendar;