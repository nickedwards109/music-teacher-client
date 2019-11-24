import React from 'react';
import Header from './Header'

export default class PasswordResetEmailSent extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  render() {
    return(
      <Header content={"Got it! A password reset email will be sent to your email address."} />
    )
  }
}
