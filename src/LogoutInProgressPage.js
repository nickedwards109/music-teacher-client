import React from 'react';

export default class LogoutInProgressPage extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
    setTimeout(this.logout, 1250);
  }

  logout() {
    this.props.history.push('/');
  }

  render() {
    return(
      <div>You are being logged out!</div>
    )
  }
}
