import { Component } from 'react'
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import PatientTable from './PatientTable';
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
      searchParam: {},
      payload: null,
      ready: false
    };
    
    this.doSearch = this.doSearch.bind(this);
  }
  
  txtToParam = (txt) => {
    let paramList = txt.trim().split(' ');
    let output = {};
    let validParams = ["fname", "lname", "phone", "email"];
    for (const param of paramList) {
      let m = param.match(/([a-z]+):([a-zA-Z0-9 @()-\\.]+)/);
      if (m !== null && validParams.includes(m[1])) {
        output[m[1]] = m[2];
      }
    }
    return output;
  }
  
  paramToTxt = (param) => {
    let txt = "";
    for (const key in param) {
      txt += `${key}:${param[key]} `;
    }
    return txt;
  }
  
  addParam = (e) => {
    let elem = document.querySelector("select#param-list");
    let searchBar = document.querySelector("input#search-bar");
    let validParams = ["fname", "lname", "phone", "email"];
    if (validParams.includes(elem.value)) {
      let txt = searchBar.value;
      let currentParam = this.txtToParam(txt);
      let currentTxt = this.paramToTxt(currentParam);
      currentTxt += `${elem.value}:`;
      searchBar.value = currentTxt;
      searchBar.focus();
    }
  }
  
  doSearch = async (e) => {
    e.preventDefault();
    
    let searchParam = this.txtToParam(document.querySelector("input#search-bar").value);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    fetch(`/api/user/mypatients/find/${this.state.page}?${new URLSearchParams(searchParam)}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        this.setState({
          payload: payload,
          ready: true
        });
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
          <div className="SearchPatient">
            <Container>
              <Row>
                <div className="navbar"><NavBar /></div>
              </Row>
              <Row>
                <div className="AddUser">
                  <Container className="pt-5">
                    <Row className="h-100 d-flex align-items-center justify-content-center">
                      <Col xs={8} className="m-2">
                        <Card>
                          <Card.Title className="m-2">Add New User</Card.Title>
                          <Form onSubmit={this.doSearch}>
                            <Form.Group className="m-2">
                              <Form.Label>Search Parameters</Form.Label>
                              <Form.Select aria-label="Default select example" id="param-list" onChange={this.addParam}>
                                <option value="none">None</option>
                                <option value="fname">First Name</option>
                                <option value="lname">Last Name</option>
                                <option value="phone">Phone</option>
                                <option value="email">Email</option>
                              </Form.Select>
                            </Form.Group>
                            
                            <Form.Group className="m-2">
                              <Form.Label>Search Patient</Form.Label>
                              <Form.Control id="search-bar" type="text" placeholder="Search Keywords" />
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
      else {
        return (
          <div className="searchPatient">
            <Container>
              <Row>
                <div className="navbar"><NavBar /></div>
              </Row>
              <PatientTable payload={this.state.payload} />
            </Container>
          </div>
        )
      }
    }
  }
  
}

export default SearchPatient;