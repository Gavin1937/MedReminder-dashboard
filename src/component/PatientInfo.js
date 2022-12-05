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
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


class PatientInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      payload: null,
      ready: false,
      notUser: false
    };
    
    this.getPatientInfo = this.getPatientInfo.bind(this);
  }
  
  componentDidMount() {
    this.getPatientInfo();
  }
  
  getPatientInfo = () => {
    let id = window.location.pathname.split("/").at(-1);
    let mat = id.match(/([pu])(\d+)/);
    if (mat[1] !== "u") {
      this.setState({notUser: true, ready: true});
      return;
    }
    id = mat[2];
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    
    let path = `/api/user/patient/${id}`;
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        if (data.ok)
          this.setState({payload: payload, ready: true});
        else
          this.setState({notUser: true, ready: true});
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
    else if (this.state.ready && this.state.notUser) {
      return (
        <div className="PatientInfo">
          <Container>
            <Row>
              <div className="navbar"><NavBar /></div>
            </Row>
            <Row className="h-100 d-flex align-items-center justify-content-center">
              <Col xs={5}>
              <div className="my-3">
                <Card>
                  <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>
                    This Patient Isn't In Our System
                  </Card.Title>
                  <a className="btn btn-danger btn-block m-2" href="/listpatient">
                    Back
                  </a>
                </Card>
              </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    else if (this.state.ready && this.state.notUser === false) {
      return (
        <div className="PatientInfo">
          <Container>
            <Row>
              <div className="navbar"><NavBar /></div>
            </Row>
            <Row>
              <div className="my-3">
                <Card>
                  <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>Patient Information</Card.Title>
                </Card>
              </div>
            </Row>
            <Row>
              <div className="Home">
                <Card>
                  <Card.Title className="m-2">Name: {this.state.payload.pat_info.fname+' '+this.state.payload.pat_info.lname}</Card.Title>
                  <Card.Title className="m-2">Phone: {this.state.payload.pat_info.phone}</Card.Title>
                  <Card.Title className="m-2">Email: {this.state.payload.pat_info.email}</Card.Title>
                  <Card.Title className="m-2">Username: {this.state.payload.username}</Card.Title>
                  <Card.Title className="m-2">
                    <a href={`/medhistory?uid=${this.state.payload.id}&mid=${this.state.payload.med_id}`}>
                      Medication History
                    </a>
                  </Card.Title>
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

export default PatientInfo;