import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar'

class Main extends React.Component {
 
  render() {
    return (
      <div id="example-component">
        <Calendar calendar_id={this.props.calendar_id}/>
      </div>
    );
  }
}

export default Main;