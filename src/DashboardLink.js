import React from 'react';
import getRole from './helpers';

export default class DashboardLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }
  }

  render() {
    let dashboardLink;
    if (this.state.loggedIn && !window.location.pathname.includes('dashboard')) {
      let token = localStorage.getItem('token')
      let role = getRole(token)
      let dashboardPath = '/' + role + '/dashboard'
      dashboardLink = <a href={dashboardPath} onClick={this.props.setLoggedOutState}>Go to Dashboard</a>;
    } else {
      dashboardLink = '';
    }
    return(
      <div>
        {dashboardLink}
      </div>
    )
  }
}
