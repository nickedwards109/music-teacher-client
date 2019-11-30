import React from 'react';
import Header from './Header';
import axios from 'axios';
import { lessonsIndexURL } from './config/config.js';

export default class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: []
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      axios({
        method: 'GET',
        url: lessonsIndexURL,
        headers: { "TOKEN":localStorage.getItem('token') }
      })
      .then((response) => {
        let data = response.data;
        let lessons = [];
        data.lessons.forEach((lesson) => {
          lessons.push(lesson);
        })
        this.setState({
          lessons: lessons
        })
      })
    }
  }

  render() {
    return(
      <div>
        <Header content="Viewing All Lessons" />
        {this.state.lessons.map((lesson) => {
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
