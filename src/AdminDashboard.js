import React from 'react';
import axios from 'axios';
import { adminDashboardURL } from './config/config';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      let token = localStorage.getItem('token');
      axios.get(adminDashboardURL, {headers: {"TOKEN": token}})
      .then((response) => {
        this.setState({firstName: response.data.firstName})
      })
      .catch((error) => {
        this.props.history.push('/')
      })
    }
  }

  render() {
    return(
      <div>
        <div>Welcome, {this.state.firstName}!</div>
        <a href="/teachers/new"> Create a New Teacher</a><br/>
        <a href="/students/new"> Create a New Student</a><br/>
      </div>
    )
  }
}

export default AdminDashboard;
