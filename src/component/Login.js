import { Component } from 'react';
import Cookies from 'js-cookie';

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      loginError: false
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
      if (data.ok) {
        this.setState({logged_in: true, username: username, secret: payload.secret, expire: payload.expire, loginFail: false});
        
        // rm ui, set cookies & redirect
        document.querySelector('.Login').remove()
        this.trySetCookies()
      }
      else {
        this.setState({logged_in: false, username: null, secret: null, expire: null, loginFail: true});
      }
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  render = () => {
    if (this.state.logged_in === false) {
      return (
        <div className="Login div-center">
          <Container className="pt-5">
            <Row className="h-100 d-flex align-items-center justify-content-center">
              <Col xs={5} className="m-2">
              <Card>
                <Card.Title className="m-2">Login To MedReminder Dashboard</Card.Title>
                {
                  (this.state.loginFail) ?
                  (
                    <Card.Title className="m-2 errmsg" style={{color:"red"}}>
                      Failed to Login. Wrong Username or Password.
                    </Card.Title>
                  ) : null
                }
                <Form onSubmit={this.login}>
                  <Form.Group className="m-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id="uname" type="text" placeholder="Enter Username" />
                  </Form.Group>
                  
                  <Form.Group className="m-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="pwd" type="password" placeholder="Password" />
                  </Form.Group>
                  
                  <Form.Group className="m-2">
                    <Form.Check type="checkbox" id="cookie" label="Use cookie to store login info?" />
                  </Form.Group>
                  
                  <Button className="m-2" variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
  
}

export default Login;
