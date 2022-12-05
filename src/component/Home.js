import { Component } from 'react'
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from "../component/NavBar";

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      fname: null,
      lname: null,
      phone: null,
      email: null
    };
    
    this.getMyInfo = this.getMyInfo.bind(this);
  }
  
  getMyInfo = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    fetch('/api/user/me', requestOptions)
    .then(response => response.json())
    .then((data) => {
      let payload = data.payload;
      this.setState({
        id: payload.doc_info.id,
        fname: payload.doc_info.fname,
        lname: payload.doc_info.lname,
        phone: payload.doc_info.phone,
        email: payload.doc_info.email
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  componentDidMount() {
    this.getMyInfo();
  }
  
  render() {
    if (Cookies.get("username") === undefined) {
      return (
        <Navigate to="/login" />
      );
    }
    else {
      return (
        <div>
          <Container>
            <Row>
              <div className="navbar"><NavBar /></div>
            </Row>
            <Row>
              <div className="my-3">
                <Card>
                  <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>Home</Card.Title>
                </Card>
              </div>
            </Row>
            <Row>
              <div className="Home">
                <Card>
                  <Card.Title className="m-2">Hello: {this.state.fname+' '+this.state.lname}</Card.Title>
                  <Card.Title className="m-2">Contact Info</Card.Title>
                  <Card.Title className="m-2">Phone: {this.state.phone}</Card.Title>
                  <Card.Title className="m-2">Email: {this.state.email}</Card.Title>
                </Card>
              </div>
            </Row>
          </Container>
        </div>
      );
    }
  }
  
}

export default Home;