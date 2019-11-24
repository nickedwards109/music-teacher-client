import React from 'react';
import Teacher from './Teacher';
import Header from './Header';

export default class TeachersIndex extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  showAllTeachers() {
    // TODO if teachers data isn't in localStorage already, request the data
    // from the server
    let teachersJSON = localStorage.getItem('teachers')
    let teachers = JSON.parse(teachersJSON)
    return teachers.map((teacher) => {
      let teacherString = JSON.stringify(teacher)
      return <Teacher teacher={teacherString} />
    })
  }

  render() {
    return(
      <div>
        <Header content="Viewing All Teachers" />
        <a href="/admin/dashboard">Go to Admin Dashboard</a>
        {this.showAllTeachers()}
      </div>
    )
  }
}
