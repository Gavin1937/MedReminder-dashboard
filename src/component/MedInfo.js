import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from "../component/NavBar";
import LoadingPage from "../component/LoadingPage";

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';


class MedInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      payload: null,
      ready: false,
    };
    
    this.getMedInfo = this.getMedInfo.bind(this);
  }
  
  componentDidMount() {
    this.getMedInfo();
  }
  
  getMedInfo = () => {
    let id = window.location.pathname.split("/").at(-1);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    
    let path = `/api/medication/${id}`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        if (data.ok)
          this.setState({payload: payload, ready: true});
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
    else if (this.state.ready) {
      return (
        <div className="MedInfo">
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
                </Card>
              </div>
            </Row>
          </Container>
        </div>
      );
    }
    else {
      return <LoadingPage />;
    }
  }
  
}

export default MedInfo;