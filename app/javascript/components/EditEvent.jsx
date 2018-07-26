import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class EditEvent extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: this.props.modalIsOpen});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: !this.props.modalIsOpen});
  }

  componentWillMount() {
    Modal.setAppElement('#example-component');
  }

  render() {
    
    return (
      <div>
        {console.log("EditEvent ->>>", this.props.editedEvent)}
        {console.log("modalIsOpen ->>>", this.props.modalIsOpen)}

        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          //style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
}


export default EditEvent;