import React from 'react';

export default class Teacher extends React.Component {
  render() {
    let teacher = JSON.parse(this.props.teacher)

    return(
      <div class="card">
        <p>{teacher.first_name} {teacher.last_name}</p>
        <p>{teacher.email}</p>
      </div>
    )
  }
}
