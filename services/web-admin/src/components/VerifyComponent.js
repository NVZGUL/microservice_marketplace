import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuth } from '../redux/actions'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { USERS_SERVICE_URL } from '../url';


class VerifyComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.handleCode = this.handleCode.bind(this)
  }

  handleCode(e) {
    this.setState({ code: e.target.value })
    console.log(this.state.code)
  }

  verifyUser(data, callback) {
    if (window.localStorage.authToken) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.authToken}`
        }
      }
      axios.post(`http://${USERS_SERVICE_URL}/auth/verify`, data, config)
        .then((res) => {
          if (res.status === 200) {
            this.props.setAuth({ isAuth: true })
            window.localStorage.setItem('verifyUser', res.data.code)
          } else {
            this.props.setAuth({ isAuth: false })
          }
          this.props.history.push('/')
        })
    }
  }

  onSubmit(e) {
    if (this.state.code !== ''){
      this.verifyUser(this.state, (err) => {
        if (err) {
          return err
        }
      })
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h2>COde</h2>
        <form onSubmit={this.onSubmit} >
          <div className="file-field input-field">
              <input type="text" value={this.state.code} name="smsCode" onChange={this.handleCode} />
          </div>
          <button type="submit" className="btn">Upload</button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(
  state => ({
    isAuth: this.getAuth
  }),
  dispatch => ({
    setAuth: (value) => dispatch(setAuth(value))
  })
)(VerifyComponent))