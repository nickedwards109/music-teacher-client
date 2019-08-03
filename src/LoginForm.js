import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <form method="post" action="http://localhost:3000/api/v1/sessions">
        <input type="text" name="session[email]" />
        <input type="text" name="session[password]" />
        <input type="submit" value="Login"/>
      </form>
    )
  }
}
