import React from 'react';
import axios from 'axios';
import Header from './Header';
import { assignmentsURL } from './config/config';
import { getId } from './helpers';

export default class AssignedLessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedLessons: []
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      let id = getId(localStorage.getItem('token'));
      axios({
        method: 'GET',
        url: assignmentsURL + '?student_id=' + id,
        headers: {"TOKEN":localStorage.getItem('token')}
      })
      .then((response) => {
        let assignedLessons = response.data.lessons;
        this.setState({
          assignedLessons: assignedLessons
        })
      })
    }
  }

  render() {
    return(
      <div>
        <Header content="Lessons assigned to you:" />
        {this.state.assignedLessons.map((lesson) => {
          return(
            <a href={"/lessons/" + lesson.id} key={lesson.id}>
              <div className="card">{lesson.title}</div>
            </a>
          )
        })}
      </div>
    )
  }
}
