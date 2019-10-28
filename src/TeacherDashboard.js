import React from 'react';
import axios from 'axios';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    axios.get("http://localhost:3000/api/v1/teacher/dashboard", {headers: {"TOKEN": token}})
    .then((response) => {
      this.setState({firstName: response.data.firstName})
    })
    .catch((error) => {
      this.props.history.push('/404')
    })
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
