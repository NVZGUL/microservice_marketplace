import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import axios from 'axios';
import UploadComponent from './components/UploadComponent';
import { connect } from 'react-redux';
import { setAuth } from './redux/actions';
import { USERS_SERVICE_URL,  DETAILS_SERVICE_URL } from './url'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMessages: []
    }
    this.createFlashMessage = this.createFlashMessage.bind(this);
  }

  componentWillMount() {
    if (window.localStorage.authToken && window.localStorage.verifyUser) {
      const options = {
        url: `http://${USERS_SERVICE_URL}/auth/getUser`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.authToken}`
        }
      }
      axios(options)
        .then((res) => {
          if (res.status === 200) {
            this.props.setAuth({ isAuth: true });
          }
        })
    }
  }

  getDetails() {
    const options = {
      url: `http://${DETAILS_SERVICE_URL}/details`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`
      }
    };
    return axios(options)
      .then((res) => {
        this.setState({ saved: res.data.data });
      })
      .catch((err) => console.log(err))
  }

  createFlashMessage(text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }

  render() {
    const { isAuth } = this.props.isAuth;
    return (
      <Switch>
        <Route exact path='/' render={() => (
          isAuth
          ? <UploadComponent />
          : <Redirect to={{
            pathname: '/login'
          }} />
        )} />
        <Route path='/login' render={() => (
          isAuth
          ? <Redirect to='/' />
          : <LoginComponent createFlashMessage={this.createFlashMessage}/>
        )} />
      </Switch>
    );
  }
}

export default connect(
  state => ({
    isAuth: state.auth
  }),
  dispatch => ({
    setAuth: (value) => dispatch(setAuth(value))
  })
)(App);
