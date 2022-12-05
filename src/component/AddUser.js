import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from "../component/NavBar";

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class AddUser extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      ready: false
    };
    
    this.doAddUser = this.doAddUser.bind(this);
  }
  
  componentDidMount() {
    
  }
  
  doAddUser = (e) => {
    e.preventDefault();
    let parent = document.querySelector("div.AddUser");
    let medElem = document.querySelector("div.AddUser input#med");
    let pwdElem = document.querySelector("div.AddUser input#password");
    
    let id = window.location.pathname.split("/").at(-1);
    id = parseInt(id);
    let med = medElem.value;
    med = parseInt(med);
    let password = pwdElem.value;
    for (let c of parent.children) {
      c.remove();
    }
    let body = {
      hospital_id: id,
      med_id: med,
      password: password,
      role: "patient"
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      },
      body: JSON.stringify(body)
    };
    
    let path = `/api/user`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let uid = data.payload.id;
        if (data.ok)
          this.setState({uid: uid, ready: true});
      })
      .catch(error => {
        console.log(error);
      });
    
  }
  
  render() {
    if (Cookies.get("username") === undefined) {
      return (
        <Navigate to="/login" />
      );
    }
    else if (this.state.ready === false) {
      return (
        <Container>
          <Row>
            <div className="navbar"><NavBar /></div>
          </Row>
          <Row>
          <div className="AddUser">
            <Container className="pt-5">
              <Row className="h-100 d-flex align-items-center justify-content-center">
                <Col xs={5} className="m-2">
                <Card>
                  <Card.Title className="m-2">Add New User</Card.Title>
                  <Form onSubmit={this.doAddUser}>
                    <Form.Group className="m-2">
                      <Form.Label>Medication Id</Form.Label>
                      <Form.Control id="med" type="text" placeholder="Medication Id" />
                    </Form.Group>
                    
                    <Form.Group className="m-2">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control id="password" type="password" placeholder="New Password" />
                    </Form.Group>
                    
                    <a className="m-2 btn btn-danger" href="/listpatient">
                      Back
                    </a>
                    
                    <Button className="m-2" variant="primary" type="submit">
                      Add
                    </Button>
                  </Form>
                </Card>
                </Col>
              </Row>
            </Container>
          </div>
          </Row>
        </Container>
      );
    }
    else if (this.state.ready === true) {
      window.location = `/patientinfo/u${this.state.uid}`;
    }
  }
  
}

export default AddUser;