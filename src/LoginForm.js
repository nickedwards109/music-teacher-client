import React from 'react';
import Header from './Header';
import axios from 'axios';
import { authenticationURL } from './config/config.js';
import { getRole } from './helpers';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    if (localStorage.getItem('token')) {
      let role = getRole(localStorage.getItem('token'));
      this.redirectToDashboard(role);
    }
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  redirectToDashboard(role) {
    if (role === "admin") {
      this.props.history.push('/admin/dashboard');
    }
    else if (role === "teacher") {
      this.props.history.push('/teacher/dashboard');
    }
    else if (role === "student") {
      this.props.history.push('/student/dashboard');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(authenticationURL + '?session[email]=' + this.state.email + '&session[password]=' + this.state.password )
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem('token', token);
      this.props.setLoggedInState();
      let params = new URLSearchParams(window.location.search)

      // The user may be a student who was sent here via a link to a lesson.
      // If so, redirect to that lesson.
      if (params.get('redirect') !== null && params.get('redirect').split('/')[1] === "lessons") {
        this.props.history.push(params.get('redirect'))
      }

      // Otherwise, redirect to the dashboard for this user's role
      else {
        let role = getRole(token);
        this.redirectToDashboard(role);
      }
    })
    .catch((error) => {
      alert('The username and password combination was invalid.');
    })
  }

  render() {
    return (
      <div className="col-12 col-lg-6 centered-layout">
        <Header content="Welcome! Please log in."/>
        <form onSubmit={this.handleSubmit} className="card">
          <div className="input-container">
            <span>Email</span>
            <input type="email" className="input-field" onKeyUp={this.setEmail}/>
          </div>
          <div className="input-container">
            <span>Password</span>
            <input type="password" className="input-field" onKeyUp={this.setPassword}/>
          </div>
          <div className="input-container">
            <input type="submit" value="Login" />
          </div>
          <div className="input-container">
            <a href="/initiate_password_reset">Forgot Password?</a>
          </div>
        </form>
      </div>
    )
  }
}
