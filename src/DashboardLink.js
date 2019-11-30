import React from 'react';

export default class DashboardLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }
  }

  // TODO getRole(token) is duplicated here and in the LoginForm component.
  // This method should be extracted to a shared implementation.
  getRole(token) {
    let encodedPayload = token.split(".")[1];
    let decodedPayload = atob(encodedPayload);
    let payloadObject = JSON.parse(decodedPayload);
    let role = payloadObject.role;
    return role;
  }

  render() {
    let dashboardLink;
    if (this.state.loggedIn && !window.location.pathname.includes('dashboard')) {
      let token = localStorage.getItem('token')
      let role = this.getRole(token)
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
