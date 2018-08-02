import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import { render } from 'react-dom';
import DatePicker from 'react-datepicker';

class EditEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      event: {},
      startDate: moment(),
      endDate: moment()
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    this.publish = this.publish.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.formatDateToPublish = this.formatDateToPublish.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }

  handleTitleChange(title) {
    this.setState({
      title: title
    });
  }

  setEvent = (event) => {
    this.setState({
      event: event,
      startDate: event.startDate,
      endDate: event.endDate,
      title: event.title
    })
  }

  childUpdateEvents = () => {
    this.props.parentEventListUpdate();
  }

  updateEventsList = () => {
    this.props.parentMethod();
  }

  formatDateToPublish = (date) => {
    const formattedDate = date.format("YYYY-MM-DD hh:mm:ss")
    return formattedDate
  }

  publish = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      fetch('/calendars/' +(this.props.calendar_id) +'/events/' + (this.state.event.id), {
        method: 'PUT',
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
          'CSRF-Token': token,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: this.state.title, start: this.formatDateToPublish(this.state.startDate), end: this.formatDateToPublish(this.state.endDate), calendar_id: this.props.calendar_id})
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
                          onChange={ this.handleTitleChange }
                          />
                </Label>
                <Label>
                  Start Date:
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                  />
                </Label>
                <Label>
                  End Date:
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
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
