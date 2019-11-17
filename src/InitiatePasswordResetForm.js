import React from 'react';
import axios from 'axios';
import Header from './Header'
import { initiatePasswordResetURL } from './config/config.js';

export default class InitiatePasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };

    this.setEmail = this.setEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setEmail(event) {
    this.setState({email: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    let email = this.state.email;
    axios.post(initiatePasswordResetURL + '?user[email]=' + email);
    this.props.history.push('/password_reset_email_sent');
  }

  render() {
    return(
      <div className="col-12 col-lg-6 centered-layout">
        <Header content={"Please enter your email address:"} />
        <form onSubmit={this.handleSubmit} className="card">
          <div className="input-container">
            <span>Email Address</span>
            <input type="email" className="input-field" onKeyUp={this.setEmail}/>
          </div>
          <div className="input-container">
            <button type="submit" >Send Password Reset Email</button>
          </div>
        </form>
      </div>
    )
  }
}
