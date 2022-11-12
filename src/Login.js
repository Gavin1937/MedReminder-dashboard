import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { Cookies } from "react-cookie";
var md5 = require('md5');

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false
    };
  }
  
  login() {
    const username = document.querySelector('#uname').value;
    const password = document.querySelector('#pwd').value;
    const auth_hash = md5(username + password);
    const use_cookie = document.querySelector('#cookie').checked;
    const cookie = new Cookies();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'auth_hash': auth_hash})
    };
    fetch('/api/auth', requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        document.querySelector('#error').innerHTML = `Fail to login. ${response.json().error}`;
      }
    })
    .then(data => {
      const payload = data.payload;
      if (use_cookie === true) {
        cookie.set("username", payload.username, { path: '/', expires: payload.expire });
        cookie.set("secret", payload.secret, { path: '/', expires: payload.expire });
        this.setState({logged_in: true});
      }
      else {
        sessionStorage.setItem("username", payload.username);
        sessionStorage.setItem("secret", payload.secret);
        this.setState({logged_in: true});
      }
      this.forceUpdate();
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render() {
    if (this.state.logged_in === true) {
      return (
        <Navigate to="/home" />
      );
    }
    else if (this.state.logged_in === false) {
      return (
        <div className="Login">
          <h1>Login Page.</h1>
          <p id="error" style={{color:"red"}}></p>
          <form onSubmit={this.login}>
            <label htmlFor="uname">username</label>
            <input id="uname" type="text" />
            <label htmlFor="pwd">password</label>
            <input id="pwd" type="password" />
            <label htmlFor="cookie">Use cookie to store login info?</label>
            <input id="cookie" type="checkbox" />
            <input type="submit" />
          </form>
        </div>
      );
    }
  }
  
}

export default Login;