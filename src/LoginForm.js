import React from 'react';
import Header from './Header';
import axios from 'axios';
import { authenticationURL } from './config/config.js';

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
  }

  setEmail(event) {
    this.setState({ email: event.target.value })
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(authenticationURL + '?session[email]=' + this.state.email + '&session[password]=' + this.state.password )
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem('token', token);
      let encodedPayload = token.split(".")[1];
      let decodedPayload = atob(encodedPayload);
      let payloadObject = JSON.parse(decodedPayload);
      let role = payloadObject.role;
      if (role === "admin") {
        this.props.history.push('/admin/dashboard');
      }
      else if (role === "teacher") {
        this.props.history.push('/teacher/dashboard');
      }
      else if (role === "student") {
        this.props.history.push('/student/dashboard');
      }
    })
    .catch((error) => {
      alert('The username and password combination was invalid.')
    })
  }

  render() {
    return (
      <div className="col-12 col-lg-6 centered-layout">
        <Header content="Welcome!"/>
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
        </form>
      </div>
    )
  }
}
