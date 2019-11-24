import React from 'react';
import Header from './Header';
import axios from 'axios';
import { showLessonBaseURL } from './config/config.js';

export default class Lesson extends React.Component {
  // TODO handle multiple assets in the Lesson component
  constructor(props) {
    super(props);
    let path = this.props.history.location.pathname;
    let lessonId = parseInt(path.split('/')[path.split('/').length - 1]);
    this.state = {
      lessonId: lessonId,
      title: "",
      text: "",
      assetStorageURLs: [],
      loading: true
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    } else {
      if (this.state.lessonId !== null) {
        axios({
          method: 'GET',
          url: showLessonBaseURL + '/' + this.state.lessonId,
          headers: { "TOKEN":localStorage.getItem('token') }
        })
        .then((response) => {
          let data = response.data;
          this.setState({
            title: data.title,
            text: data.text,
            assetStorageURLs: [data.assets[0].storageURL],
            loading: false
          })
        })
      }
    }
  }

  render() {
    if (this.state.loading === true) {
      return(
        <div>Loading...</div>
      )
    } else {
      return(
        <div>
          <Header content={this.state.title} />
          <p>{this.state.text}</p>
          <audio controls>
            <source src={this.state.assetStorageURLs[0]} />
          </audio>
        </div>
      )
    }
  }
}
