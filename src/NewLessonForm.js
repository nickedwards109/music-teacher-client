import React from 'react';
import axios from 'axios';
import { createLessonURL } from './config/config.js';
import { presignedUploadURL } from './config/config.js';

export default class NewLessonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    }
    this.setTitle = this.setTitle.bind(this);
    this.setText = this.setText.bind(this);
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTitle(event) {
    this.setState({title: event.target.value})
  }

  setText(event) {
    this.setState({text: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: presignedUploadURL,
      data: {},
      headers: { "TOKEN":localStorage.getItem('token') }
    })
    .then((response) => {
      const payload = response.data;
      const assetUploadURL = payload.url;
      let fileFormData = new FormData();
      Object.keys(payload.fields).forEach(key =>
        fileFormData.append(key, payload.fields[key])
      );
      const file = this.fileInput.current.files[0];
      fileFormData.append('file', file);
      axios({
        method: 'post',
        url: assetUploadURL,
        data: fileFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        const assetStorageURL = new DOMParser()
          .parseFromString(response.data, 'application/xml')
          .getElementsByTagName('Location')[0].textContent;
        // TODO enable associating many assets with a lesson instead of just one
        let lessonFormData = {
          'lesson': {
            'title': this.state.title,
            'text': this.state.text,
            'assets_attributes': [{'storageURL': assetStorageURL}]
          }
        }
        axios({
          method: "post",
          url: createLessonURL,
          data: lessonFormData,
          headers: { "TOKEN":localStorage.getItem('token') }
        })
      })
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <span>Lesson Title:</span>
            <input type="text" name="lesson[title]" className="input-field" onKeyUp={this.setTitle} />
          </div>
          <div className="input-container">
            <span>Lesson Text:</span>
            <textarea type="text" name="lesson[text]" className="input-field" onKeyUp={this.setText} />
          </div>
          <div className="input-container">
            <span>Attach an Audio File</span>
            <input type="file" name="lesson[audioFile]" className="input-field" ref={this.fileInput} />
          </div>
          <div className="inputContainer">
            <button type="submit" name="lesson">Create Lesson</button>
          </div>
        </form>
      </div>
    )
  }
}
