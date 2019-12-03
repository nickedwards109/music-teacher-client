import React from 'react';
import Header from './Header'

export default class NewStudentEmailSent extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  render() {
    return(
      <div>
        <Header content={"An email has been sent to the new student. They will need to open this email and follow the link inside to set their password."} />
      </div>
    )
  }
}
