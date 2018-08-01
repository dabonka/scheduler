import React from 'react';
import {render} from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import EditEvent from './EditEvent'
import AddNewEventModal from './AddNewEventModal'

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

  toggleEditModal = (date) =>{
    this.refs.child.toggle()
    this.refs.child.setDate(date)
  }   
  

  componentDidMount(){
    // fetch('/calendars/' +this.props.calendar_id +'/events.json')
    //   .then(response => response.json())
    //   .then(data => this.setState({ events: data }))

    this.listUpdate();
  }



  // componentDidUpdate(){
  //   fetch('/calendars/' +this.props.calendar_id +'/events.json')
  //     .then(response => response.json())
  //     .then(data => this.setState({ events: data }))
  // }

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
        <AddNewEventModal ref="child" calendar_id={ this.props.calendar_id }  parentMethod={this.listUpdate}/>
      </div>
    );
  }

  dayClick (date, allDay, jsEvent, view) {
    const formattedDate = date.format()
    this.toggleEditModal(formattedDate);
  }

  eventClick (date, allDay, jsEvent, view) {
  }

}

export default Calendar;