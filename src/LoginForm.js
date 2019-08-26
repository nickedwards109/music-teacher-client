import React from 'react';
import authenticationURL from './config/config.js';
import axios from 'axios';

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
      // TODO route to the dashboard associated with this particular role
    })
    .catch((error) => {
      alert('The username and password combination was invalid.')
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onKeyUp={this.setEmail}/>
        <input type="text" onKeyUp={this.setPassword}/>
        <input type="submit" value="Login" />
      </form>
    )
  }
}
