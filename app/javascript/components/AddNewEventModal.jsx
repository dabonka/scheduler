import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class AddNewEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      titleEvent: '',
      dateEvent: '02-02-18'
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  setDate = (date) => {
    this.setState({
      dateEvent: date
    })
    console.log ("setted date --->", this.state.dateEvent)
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
        body: JSON.stringify({title: title, start: this.state.dateEvent, calendar_id: this.props.calendar_id})
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
          <ModalHeader toggle={this.toggle}>New event</ModalHeader>
            <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>
                  Title:
                  <Input  type="text" 
                          name="titleEvent" 
                          value={ this.state.titleEvent } 
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

export default AddNewEventModal;


//this.setState({ events: updatedEvents }))
  //   const title = prompt('Event Title:');
  //   const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  //     fetch('/calendars/' +(this.props.calendar_id) +'/events.json', {
  //       method: 'post',
  //       credentials: 'same-origin', // <-- includes cookies in the request
  //       headers: {
  //         'CSRF-Token': token,
  //         'Accept': 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({title: title, start: date.format(), calendar_id: this.props.calendar_id})
  //     })
  //     .then((json)=>{ 
  //       console.log("json--->", json); 
  //       fetch('/calendars/' +this.props.calendar_id +'/events.json')
  //              .then(updatedEvents => updatedEvents.json())
  //              .then((updatedEvents) => this.setState({ events: updatedEvents }))

  //  })