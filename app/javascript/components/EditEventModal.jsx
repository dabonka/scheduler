import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      titleEvent: '',
      dateEvent: '02-02-18',
      startEvent: null,
      endEvent: null,
      event: {}
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.formatDateForInput = this.formatDateForInput.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  setEvent = (event) => {
    this.setState({
      event: event
    })
  }

  childUpdateEvents = () => {
    this.props.parentEventListUpdate();
  }

  updateEventsList = () => {
    this.props.parentMethod();
  }

  publish = () => {
    console.log(this.state.titleEvent);
    const title = this.state.titleEvent;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      fetch('/calendars/' +(this.props.calendar_id) +'/events.json', {
        method: 'post',
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
          'CSRF-Token': token,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, start: this.state.startEvent, end: this.state.endEvent, calendar_id: this.props.calendar_id})
      })
      .then((json)=>{ 
        console.log("json--->", json); 
        this.updateEventsList();
      })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  submit = () => {
    this.toggle();
    this.publish();
  }

  formatDateForInput = (date) => {

    if (date) {
      let formattedDate = date.toDate()
      let dd = formattedDate.getDate();
      let mm = formattedDate.getMonth()+1; //January is 0!
      let yyyy = formattedDate.getFullYear();

      if(dd<10){
        dd='0'+dd;
      } 

      if(mm<10){
        mm='0'+mm;
      } 

      const newDate = yyyy+'-'+mm+'-'+dd;
      console.log("newDate=>>>", newDate)
      return newDate;
    } else {
      return ''
    }
 }
  

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit event</ModalHeader>
            <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>
                  Title:
                  <Input  type="text" 
                          name="titleEvent" 
                          value={ this.state.event.title } 
                          onChange={ this.handleChange }
                          />
                </Label>
                <Label>
                  Start Date:
                  <Input  type="date" 
                          name="startDateEvent" 
                          value={ this.formatDateForInput(this.state.event.start) } 
                          onChange={ this.handleChange }
                          />
                </Label>
                <Label>
                  End Date:
                  <Input  type="date" 
                          name="endDateEvent" 
                          value={ this.formatDateForInput(this.state.event.end) } 
                          onChange={ this.handleChange }
                          />
                </Label>
              </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>Save</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditEventModal;
