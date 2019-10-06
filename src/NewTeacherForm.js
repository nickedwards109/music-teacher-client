import React from 'react'
import Header from './Header'
import axios from 'axios';
import { createUserURL } from './config/config.js';

export default class NewTeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    }

    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setPasswordConfirmation = this.setPasswordConfirmation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setFirstName(event) {
    this.setState({firstName: event.target.value})
  }

  setLastName(event) {
    this.setState({lastName: event.target.value})
  }

  setEmail(event) {
    this.setState({email: event.target.value})
  }

  setPassword(event) {
    this.setState({password: event.target.value})
  }

  setPasswordConfirmation(event) {
    this.setState({password_confirmation: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(createUserURL, {
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          role: "teacher",
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        }
      },
      {  headers:
           {"TOKEN":localStorage.getItem('token')}
      }
    )
    .then((response) => {
      // TODO handle the response
    })
  }

  render() {
    return(
      <div className="col-12 col-lg-6 centered-layout">
        <Header content="Please enter the new teacher's details:" />
        <form onSubmit={this.handleSubmit} className="card">
          <div className="input-container">
            <span>First Name</span>
            <input type="text" name="user[first_name]" className="input-field" onKeyUp={this.setFirstName}/>
          </div>
          <div className="input-container">
            <span>Last Name</span>
            <input type="text" name="user[last_name]" className="input-field" onKeyUp={this.setLastName}/>
          </div>
          <div className="input-container">
            <span>Email</span>
            <input type="email" name="user[email]" className="input-field" onKeyUp={this.setEmail}/>
          </div>
          <div className="input-container">
            <span>Initial Password</span>
            <input type="password" name="user[password]" className="input-field" onKeyUp={this.setPassword}/>
          </div>
          <div className="input-container">
            <span>Initial Password Confirmation</span>
            <input type="password" name="user[password_confirmation]" className="input-field" onKeyUp={this.setPasswordConfirmation}/>
          </div>
          <input type="hidden" name="user[role]" value="teacher"/>
          <div className="input-container">
            <button type="submit" name="user">Create Teacher</button>
          </div>
        </form>
      </div>
    )
  }
}
