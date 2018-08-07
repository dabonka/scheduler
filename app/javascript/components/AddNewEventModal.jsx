import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import momentExt from 'fullcalendar/src/moment-ext';

class AddNewEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      dateEvent: moment(),
      startDate: null,
      endDate: null
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
      dateEvent: moment(date, "YYYY-MM-DD")
    })
  }

  childUpdateEvents = () => {
    this.props.parentEventListUpdate();
  }

  updateEventsList = () => {
    this.props.parentMethod();
  }

  handleTitleChange(title) {
    this.setState({
      title: title
    });
  }

  publish = () => {
    const title = this.state.title;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      fetch('/calendars/' +(this.props.calendar_id) +'/events.json', {
        method: 'POST',
        credentials: 'same-origin', // <-- includes cookies in the request
        headers: {
          'CSRF-Token': token,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, start: this.state.dateEvent, calendar_id: this.props.calendar_id})
      })
      .then((json)=>{ 
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
                <div className="row">
                    <div className="col-2">
                      Title:
                    </div>
                    <div className="col-lg-10">
                      <input value={this.state.title} onChange={this.handleTitleChange} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                      Start Date:
                    </div>
                    
                    <div className="col-2">
                      <DatePicker
                        selected={this.state.startDate ? this.state.startDate : this.state.dateEvent}
                        onChange={this.handleStartDateChange}
                      />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                      End Date:
                    </div>
                    <div className="col-2">
                      <DatePicker
                        selected={this.state.endDate ? this.state.endDate : this.state.dateEvent }
                        onChange={this.handleEndDateChange}
                      />
                    </div>
                </div>
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
