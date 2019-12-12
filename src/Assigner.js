import React from 'react';
import Header from './Header';
import axios from 'axios';
import { studentsIndexURL } from './config/config';
import { createAssignmentURL } from './config/config';

export default class Assigner extends React.Component {
  constructor() {
    super();
    this.state = {
      allStudents: [],
      studentIDsToBeAssigned: [],
      submitted: false
    }
    this.setAssignedStudent = this.setAssignedStudent.bind(this);
    this.createAssignments = this.createAssignments.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: studentsIndexURL,
      headers: { "TOKEN":localStorage.getItem('token') }
    })
    .then((response) => {
      let allStudents = response.data.students.map((student) => {
        return {
          id: student.id,
          name: student.first_name + " " + student.last_name,
        }
      }
      );
      this.setState({allStudents: allStudents});
    })
  }

  setAssignedStudent(event) {
    let studentID = event.target.value;
    let studentIDsToBeAssigned = [];
    if (this.state.studentIDsToBeAssigned.includes(studentID)) {
      studentIDsToBeAssigned = this.state.studentIDsToBeAssigned.filter((id) =>
        id !== studentID
      )
    }
    else {
      studentIDsToBeAssigned = this.state.studentIDsToBeAssigned;
      studentIDsToBeAssigned.push(studentID);
    }
    this.setState({studentIDsToBeAssigned: studentIDsToBeAssigned})
  }

  createAssignments() {
    let lessonID = this.props.lessonID;
    for (let studentID of this.state.studentIDsToBeAssigned) {
      let assignment = {
        user_id: studentID,
        lesson_id: lessonID
      }
      axios({
        method: 'POST',
        url: createAssignmentURL,
        data: assignment,
        headers: { "TOKEN":localStorage.getItem('token') }
      })
      .catch((error) => {
        window.location = '/404'
      })
    }
    this.setState({submitted: true})
  }

  render() {

    let studentNameCheckboxElements = this.state.allStudents.map((student) =>
      <div key={student.id}>
        <input type="checkbox" value={student.id} onChange={this.setAssignedStudent}/>{student.name}<br/>
      </div>
    );

    let AssignerTemplate;
    if (this.state.submitted === false) {
      AssignerTemplate =
      <div>
        <Header content='Assign this lesson to students:' />
        <div>
          {studentNameCheckboxElements}
        </div>
        <button onClick={this.createAssignments}>Assign to Students</button>
      </div>
    } else {
      AssignerTemplate =
      <div>
        This lesson has been assigned to the selected students in the back-end
        database. Functionality does not yet exist to notify students of this
        assignment.
      </div>
    }

    return(
      <div>
        {AssignerTemplate}
      </div>
    )
  }
}
