import { Component } from 'react'
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


class SearchPatient extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      payload: null,
      searchFail: false,
      ready: false
    };
    
    this.doSearch = this.doSearch.bind(this);
  }
  
  doSearch = async (e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    let searchParam = {
      name: document.querySelector("form.search-form #name").value,
      frequency: parseInt(document.querySelector("form.search-form #frequency").value),
      early_time: parseInt(document.querySelector("form.search-form #early_time").value),
      late_time: parseInt(document.querySelector("form.search-form #late_time").value)
    };
    fetch(`/api/medication/find?${new URLSearchParams(searchParam)}`, requestOptions)
    .then(response => response.json())
    .then((data) => {
      let payload = data.payload;
      if (data.ok)
        this.setState({ payload: payload, searchFail: false, ready: true });
      else
        this.setState({ payload: null, searchFail: true, ready: false});
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
    else {
      if (this.state.ready === false) {
        return (
          <div className="SearchMed">
            <Container>
              <Row>
                <div className="navbar"><NavBar /></div>
              </Row>
              <Row>
                <div className="SearchMed">
                  <Container className="pt-5">
                    <Row className="h-100 d-flex align-items-center justify-content-center">
                      <Col xs={8}>
                        <a className="btn btn-primary" href="/addmed">Add Medication</a>
                      </Col>
                    </Row>
                    <Row className="h-100 d-flex align-items-center justify-content-center">
                      <Col xs={8} className="m-2">
                      <Card>
                        <Card.Title className="m-2">Search Medication</Card.Title>
                        <Form className="search-form" onSubmit={this.doSearch}>
                          <Form.Group className="m-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control id="name" type="text" placeholder="Name" />
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
                          
                          <Button className="m-2" variant="primary" type="submit">
                            Search
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
      else if (this.state.ready === true && this.state.searchFail === false) {
        return (
          <div className="searchMed">
            <Container>
              <Row>
                <div className="navbar"><NavBar /></div>
              </Row>
              <Row>
                <div className="my-3">
                  <Card>
                    <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>Medication Information</Card.Title>
                  </Card>
                </div>
              </Row>
              <Row>
                <div className="Home">
                  <Card>
                    <Card.Title className="m-2">Id: {this.state.payload.id}</Card.Title>
                    <Card.Title className="m-2">Name: {this.state.payload.name}</Card.Title>
                    <Card.Title className="m-2">Description: {this.state.payload.description}</Card.Title>
                    <Card.Title className="m-2">Frequency: {this.state.payload.frequency}</Card.Title>
                    <Card.Title className="m-2">Early Time: {this.state.payload.early_time}</Card.Title>
                    <Card.Title className="m-2">Late Time: {this.state.payload.late_time}</Card.Title>
                    <Card.Title className="m-2"><a className="btn btn-primary" href="/searchmed">Search Again</a></Card.Title>
                  </Card>
                </div>
              </Row>
            </Container>
          </div>
        );
      }
    }
  }
  
}

export default SearchPatient;