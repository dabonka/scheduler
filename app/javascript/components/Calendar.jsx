import React from 'react';
import {render} from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import EditEvent from './EditEvent'
import AddNewEventModal from './AddNewEventModal'
import EditEventModal from './EditEventModal'

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: null,
      eventData: null
    };

    this.listUdpate = this.listUpdate.bind(this)
  }

  listUpdate = () =>{
    fetch('/calendars/' +this.props.calendar_id +'/events.json')
    .then(response => response.json())
    .then(data => this.setState({ events: data }))
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
    console.log("date---->", date)
    this.toggleEditEventModal(date);
  }

}

export default Calendar;