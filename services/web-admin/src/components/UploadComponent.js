import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAuth } from '../redux/actions';
import { withRouter } from 'react-router';
import { DETAILS_SERVICE_URL } from '../url';

class UploadComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  logoutUser(e) {
    e.preventDefault()
    window.localStorage.clear()
    this.props.setAuth({ isAuth: false })
    this.props.history.push('/')
  }

  onSubmit (e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.file !== undefined) {
      formData.append('myFile', this.state.file)
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.authToken}`
        }
      }
      try {
        axios.post(`http://${DETAILS_SERVICE_URL}/details`, formData, config).then(console.log)  
      } catch (error) {
        console.log(error)
      }
      
    }
    else {
      console.log("You entered the empty file")
    }
  }

  handleFile(e) {
    this.setState({file: e.target.files[0]})
  }

  render(){
    return (
      <div className="container">
        <h2>ADMIN</h2>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="file-field input-field">
            <div className="btn grey">
              <span>File</span>
              <input type="file" name="myFile" onChange={this.handleFile}/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
            </div>
            <button type="submit" className="btn">Upload</button>
        </form>
        <br/>
        <a href="" onClick={this.logoutUser}> Logout </a>
      </div>
    )
  }
}
export default withRouter(connect(
  state => ({
    isAuth: state.auth
  }),
  dispatch => ({
    setAuth: (value) => dispatch(setAuth(value))
  })
)(UploadComponent))