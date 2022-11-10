import React, { Component } from 'react'
import ApiUrl from './Config'

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: 'no-data'
    };
  }
  
  componentDidMount() {
    this.hello();
  }
  
  hello() {
    fetch(`${ApiUrl}/api/hello`)
    .then(response => {
      if(response.ok) return response.text();
      throw new Error(`Request failed. ${response.body}`);
    })
    .then(data => {
      this.setState({data: data.error});
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  login() {
    const username = document.querySelector('#uname').value;
    const auth_hash = document.querySelector('#pwd').value;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'username': username, 'auth_hash': auth_hash})
    };
    fetch(`${ApiUrl}/api/auth`, requestOptions)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Fail to login. ${response.json().error}`);
    })
    .then(data => {
      this.setState({data: data.payload});
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render() {
    return (
      <div className="Login">
        <h1>Login Page.</h1>
        <p>{this.state.data}</p>
        <form onSubmit={this.login}>
          <label htmlFor="uname">username</label>
          <input id="uname" type="text" />
          <label htmlFor="pwd">password</label>
          <input id="pwd" type="text" />
          <input type="submit" />
        </form>
      </div>
    );
  }
  
}

export default Login;