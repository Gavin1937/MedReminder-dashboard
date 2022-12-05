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


class AddMed extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mid: null,
      ready: false
    };
    
    this.doAddMed = this.doAddMed.bind(this);
  }
  
  componentDidMount() {
    
  }
  
  doAddMed = (e) => {
    e.preventDefault();
    let parent = document.querySelector("div.AddMed");
    let name = document.querySelector("div.AddMed input#name").value;
    let desc = document.querySelector("div.AddMed input#description").value;
    let freq = parseInt(document.querySelector("div.AddMed input#frequency").value);
    let early = parseInt(document.querySelector("div.AddMed input#early_time").value);
    let late = parseInt(document.querySelector("div.AddMed input#late_time").value);
    for (let c of parent.children) {
      c.remove();
    }
    
    let body = {
      name: name,
      description: desc,
      frequency: freq,
      early_time: early,
      late_time: late
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
    
    let path = `/api/medication`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let mid = data.payload.id;
        if (data.ok)
          this.setState({mid: mid, ready: true});
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
        <div className="AddMed">
          <Container>
            <Row>
              <div className="navbar"><NavBar /></div>
            </Row>
            <Row>
              <div className="AddMed">
                <Container className="pt-5">
                  <Row className="h-100 d-flex align-items-center justify-content-center">
                    <Col xs={8} className="m-2">
                    <Card>
                      <Card.Title className="m-2">Add New Medication</Card.Title>
                      <Form onSubmit={this.doAddMed}>
                        <Form.Group className="m-2">
                          <Form.Label>Name</Form.Label>
                          <Form.Control id="name" type="text" placeholder="Name" />
                        </Form.Group>
                        
                        <Form.Group className="m-2">
                          <Form.Label>Description</Form.Label>
                          <Form.Control id="description" type="text" placeholder="Description" />
                        </Form.Group>
                        
                        <Form.Group className="m-2">
                          <Form.Label>Frequency</Form.Label>
                          <Form.Control id="frequency" type="text" placeholder="Frequency" />
                        </Form.Group>
                        
                        <Form.Group className="m-2">
                          <Form.Label>Early Time</Form.Label>
                          <Form.Control id="early_time" type="text" placeholder="Early Time" />
                        </Form.Group>
                        
                        <Form.Group className="m-2">
                          <Form.Label>Late Time</Form.Label>
                          <Form.Control id="late_time" type="text" placeholder="Late Time" />
                        </Form.Group>
                        
                        <a className="m-2 btn btn-danger" href="/searchmed">
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
        </div>
      );
    }
    else if (this.state.ready === true) {
      window.location = `/medinfo/${this.state.mid}`;
    }
  }
  
}

export default AddMed;