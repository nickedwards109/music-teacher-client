import React from 'react';
import authenticationURL from './config/config.js';

export default class LoginForm extends React.Component {
  render() {
    return (
      <form method="post" action={authenticationURL}>
        <input type="text" name="session[email]" />
        <input type="text" name="session[password]" />
        <input type="submit" value="Login"/>
      </form>
    )
  }
}
