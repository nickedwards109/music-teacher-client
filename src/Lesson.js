import React from 'react';
import Header from './Header';
import Assigner from './Assigner';
import { getRole } from './helpers';
import axios from 'axios';
import { showLessonBaseURL } from './config/config.js';

export default class Lesson extends React.Component {
  constructor(props) {
    super(props);
    let path = this.props.history.location.pathname;
    let lessonID = parseInt(path.split('/')[path.split('/').length - 1]);
    let role;
    if (localStorage.getItem('token')) {
      role = getRole(localStorage.getItem('token'))
    } else {
      role = null;
    }
    this.state = {
      lessonID: lessonID,
      title: "",
      text: "",
      assetStorageURLs: [],
      loading: true,
      role: role
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/?redirect=' + window.location.pathname)
    } else {
      if (this.state.lessonID !== null) {
        axios({
          method: 'GET',
          url: showLessonBaseURL + '/' + this.state.lessonID,
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
    let assetPlayer;
    if (this.state.loading === true) {
      return(
        <div>Loading...</div>
      )
    } else {
      let assetStorageURL = this.state.assetStorageURLs[0];
      let filenameExtension = assetStorageURL.split('.')[assetStorageURL.split('.').length - 1].toUpperCase();
      if (
        filenameExtension === "WAV" ||
        filenameExtension === "MP3" ||
        filenameExtension === "WMA" ||
        filenameExtension === "M4A" ||
        filenameExtension === "FLAC"
      )
      {
        assetPlayer = <audio controls>
                        <source src={assetStorageURL} />
                      </audio>
      }
      else if (
        filenameExtension === "MOV"   ||
        filenameExtension === "GIF"   ||
        filenameExtension === "GIFV"  ||
        filenameExtension === "AVI"   ||
        filenameExtension === "WMV"   ||
        filenameExtension === "MP4"   ||
        filenameExtension === "M4P"   ||
        filenameExtension === "M4V"   ||
        filenameExtension === "MPG"   ||
        filenameExtension === "MPEG"
      )
      {
        assetPlayer = <video controls>
                        <source src={assetStorageURL} />
                      </video>
      }

      let assigner;
      if (this.state.role === 'teacher' || this.state.role === 'admin') {
        assigner = <Assigner lessonID={this.state.lessonID}/>
      } else {
        assigner = ''
      }

      return(
        <div className="col-12 col-lg-6">
          <Header content={this.state.title} />
          <p>{this.state.text}</p>
          {assetPlayer}
          {assigner}
        </div>
      )
    }
  }
}
