import React from 'react';
import axios from 'axios';

class StudentDashboard extends React.Component {
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
      axios.get("http://localhost:3000/api/v1/student/dashboard", {headers: {"TOKEN": token}})
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
      <div>Welcome, {this.state.firstName}!</div>
    )
  }
}

export default StudentDashboard;
