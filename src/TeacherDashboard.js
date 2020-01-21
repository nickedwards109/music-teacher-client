import React from 'react';
import axios from 'axios';
import { teacherDashboardURL } from './config/config'

class TeacherDashboard extends React.Component {
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
      axios.get(teacherDashboardURL, {headers: {"TOKEN": token}})
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
        <div>This is your teacher dashboard.</div>
        <a href="/lessons/new">Create a New Lesson</a><br/>
        <a href="/lessons">View All Lessons</a>
      </div>
    )
  }
}

export default TeacherDashboard;
