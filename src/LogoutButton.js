import React from 'react';

export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    if (this.state.loggedIn !== this.props.loggedIn) {
      this.setState({loggedIn: this.props.loggedIn})
    }
  }

  render() {
    let logoutButton;
    if (this.state.loggedIn) {
      logoutButton = <a href='/logout' onClick={this.props.setLoggedOutState}>Logout</a>;
    } else {
      logoutButton = '';
    }
    return(
      <div>
        {logoutButton}
      </div>
    )
  }
}
