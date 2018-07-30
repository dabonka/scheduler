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

  componentDidMount(){
    fetch('/calendars/' +this.props.calendar_id +'/events.json')
      .then(response => response.json())
      .then(data => this.setState({ events: data }))
  }

  render() {
    return (
      <div id="example-component">
      <FullCalendar
        id={this.props.calendar_id}
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
        dayClick = {this.dayClick.bind(this)}
        eventClick = {this.eventClick.bind(this)}
      />
          
      </div>
    );
  }

  dayClick (date, allDay, jsEvent, view) {
    const title = prompt('Event Title:');
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    fetch('/calendars/' +(this.props.calendar_id) +'/events.json', {
      method: 'post',
      credentials: 'same-origin', // <-- includes cookies in the request
      headers: {
        'CSRF-Token': token,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title, start: date.format(), calendar_id: this.props.calendar_id})
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
  }

  eventClick (date, allDay, jsEvent, view) {
    // const title = prompt('Event Title:');
    // fetch('/api/v1/events.json', {
    //   method: 'post',
    //   headers: {
    //     'Accept': 'application/json, text/plain, */*',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({title: title, start: date })
    // }).then(res=>res.json())
    //   .then(res => console.log(res));
  }

}

export default Calendar;