import React from 'react';
import axios from 'axios';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: ""
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    axios.get("http://localhost:3000/api/v1/admin/dashboard?token=" + token)
    .then((response) => {
      this.setState({firstName: response.data.firstName})
    })
    .catch((error) => {
      // TODO render a 404 page
    })
  }

  render() {
    return(
      <div>Welcome, {this.state.firstName}!</div>
    )
  }
}

export default AdminDashboard;
