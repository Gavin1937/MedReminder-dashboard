import { Component } from 'react';
import Cookies from 'js-cookie';
let md5 = require('md5');

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      use_cookie: false,
      username: null,
      secret: null,
      expire: null,
    };
    
    // bind functions that requires setState()
    this.trySetCookies = this.trySetCookies.bind(this);
    this.login = this.login.bind(this);
  }
  
  epochToDaysFromNow = (unixTime) => {
    let now = (new Date()).getTime() / 1000;
    let output = (unixTime - now) / (3600 * 24);
    output = output - 0.001;
    return output;
  }
  
  trySetCookies = async () => {
    // wait for login() to finish
    if (this.state.logged_in !== true) {
      setTimeout(this.trySetCookies, 50);
      return;
    }
    
    // set cookies & redirect
    if (this.state.use_cookie === true) {
      let days = this.epochToDaysFromNow(this.state.expire);
      Cookies.set("username", this.state.username, { path: '/', expires: days });
      Cookies.set("secret", this.state.secret, { path: '/', expires: days });
    }
    else {
      Cookies.set("username", this.state.username);
      Cookies.set("secret", this.state.secret);
    }
    window.location.replace('/home');
  }
  
  login = async (e) => {
    // SUPER IMPORTANT!
    // this line will force browser to
    // stuck at this function until it finishes
    e.preventDefault();
    
    // collect ui data & post api auth
    const username = document.querySelector('#uname').value;
    const password = document.querySelector('#pwd').value;
    const auth_hash = md5(username + password);
    this.setState({use_cookie: document.querySelector('#cookie').checked});
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'auth_hash': auth_hash})
    };
    fetch('/api/auth', requestOptions)
    .then(response => response.json())
    .then((data) => {
      const payload = data.payload;
      this.setState({logged_in: true, username: username, secret: payload.secret, expire: payload.expire})
    })
    .catch(error => {
      console.log(error);
    });
    
    // rm ui, set cookies & redirect
    document.querySelector('.Login').remove()
    this.trySetCookies()
    
  };
  
  render = () => {
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
  };
  
}

export default Login;