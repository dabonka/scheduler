import React from 'react';
import {render} from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import AddNewEventModal from './AddNewEventModal'
import EditEventModal from './EditEventModal'
import moment from 'moment';

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null,
      eventData: null
    };

    this.listUdpate = this.listUpdate.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
    this.formatDateToPublish = this.formatDateToPublish.bind(this)
  }

  listUpdate = () =>{
    fetch('/calendars/' +this.props.calendar_id +'/events.json')
    .then(response => response.json())
    .then(data => this.setState({ events: data }))
  }

  formatDateToPublish = (date) => {
    if (!date) {
      date = moment()
    }
    const formattedDate = date.format("YYYY-MM-DD hh:mm:ss");
    return formattedDate;
  }

  updateEvent = (event) => {
    console.log("update event--->", event)
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      fetch('/calendars/' +(this.props.calendar_id) +'/events/' + (event.id), {
        method: 'PUT',
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
          'CSRF-Token': token,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: event.title, start: this.formatDateToPublish(event.start), end: this.formatDateToPublish(event.end), calendar_id: this.props.calendar_id})
      })
      .then((json)=>{ 
        console.log(json)
        this.updateEventsList();
      })
  }

  toggleNewEventModal = (date) =>{
    this.refs.childNewModal.toggle()
    this.refs.childNewModal.setDate(date)
  } 
  
  toggleEditEventModal = (event) =>{
    this.refs.childEditModal.toggle()
    this.refs.childEditModal.setEvent(event)
  }   
  

  componentDidMount(){
    this.listUpdate();
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
        eventDrop = {this.eventDrop.bind(this)}
      />
        <AddNewEventModal ref="childNewModal" calendar_id={ this.props.calendar_id } parentMethod={this.listUpdate}/>
        <EditEventModal ref="childEditModal" calendar_id={ this.props.calendar_id } parentMethod={this.listUpdate}/>
      </div>
    );
  }

  dayClick (date, allDay, jsEvent, view) {
    const formattedDate = date.format()
    this.toggleNewEventModal(formattedDate);
  }

  eventClick (date, allDay, jsEvent, view) {
    this.toggleEditEventModal(date);
  }

  eventDrop (event, delta, revertFunc) {
    this.updateEvent(event)
  }

}

export default Calendar;