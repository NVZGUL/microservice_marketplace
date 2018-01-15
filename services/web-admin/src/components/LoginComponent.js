import React, { Component } from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';
import '../css/LoginComponent.css'
import { USERS_SERVICE_URL } from '../url';
import VerifyComponent from './VerifyComponent';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      errors: {},
      username: '',
    };
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  loginUser(data, callback) {
    return axios.post(`http://${USERS_SERVICE_URL}/auth/login`, data)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.msg.token)
        //this.props.setAuth({ isAuth: true })
        this.setState({ isLogin: true })
        // TODO ADD PHONE
        //this.props.history.push('/verify')
      })
      .catch((err) => callback("Error"))
  }

  responseGoogle(response) {
    this.setState({
      username: response.w3.U3
    });
    this.loginUser(this.state, (err) => {
      if (err) {
        this.props.createFlashMessage(err, 'error')
      }
    })
  }
  render() {
    const responseGoogle = this.responseGoogle
    const { isLogin } = this.state
    return (
      <div className="login">
        <div className="brand">
          <h1>K U P I Z A P C H A S T I</h1>
        </div>
        <div className="container">
          <div className="login-form">
            {isLogin ?
            <VerifyComponent /> :
            <div className="login-form__content">
              <div className="login-form__header">
                Войдите В Свой Аккаунт
              </div>
              <div className="login-form__description">
                Если вам не удасться войти, то свяжитесь с администратором о предоставлении доступа
              </div>
              <hr/>
              <GoogleLogin
                className="btn white"
                clientId={`${CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={console.log}
              >
              <span className="btn__text">Google</span>
              </GoogleLogin>  
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}