import React from 'react'
import Header from './Header'
import axios from 'axios';
import { sendNewUserEmailURL } from './config/config.js';

export default class NewTeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    }

    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
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

  handleSubmit(event) {
    event.preventDefault();
    axios.post(sendNewUserEmailURL, {
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          role: "teacher"
        }
      },
      {  headers:
           {"TOKEN":localStorage.getItem('token')}
      }
    )
    .then((response) => {
      let teachersJSON = '[' + response.data.users + ']'
      localStorage.setItem('teachers', teachersJSON)
      window.location = '/teachers'
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
          <input type="hidden" name="user[role]" value="teacher"/>
          <div className="input-container">
            <button type="submit" name="user">Create Teacher</button>
          </div>
        </form>
      </div>
    )
  }
}
