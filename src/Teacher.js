import React from 'react';

export default class Teacher extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }
  
  render() {
    let teacher = JSON.parse(this.props.teacher)

    return(
      <div className="card">
        <p>{teacher.first_name} {teacher.last_name}</p>
        <p>{teacher.email}</p>
      </div>
    )
  }
}
