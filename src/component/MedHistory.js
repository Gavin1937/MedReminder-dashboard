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
import Table from 'react-bootstrap/Table';


class MedHistory extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      elem: null,
      ready: false
    };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getMedHistory = this.getMedHistory.bind(this);
  }
  
  componentDidMount = () => {
    this.getMedHistory();
  }
  
  getMedHistory = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    
    let search = new URLSearchParams(window.location.search);
    let uid = search.get("uid");
    let mid = search.get("mid");
    let path = `/api/medication/history?user_id=${uid}&med_id=${mid}&med_id_opt=eq`
    fetch(`${path}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        let array = []
        for (let i = 0; i < payload.length; ++i) {
          let time = new Date(parseInt(payload.at(i).med_time) * 1000)
          let year = String(time.getFullYear()).padStart(4,"0");
          let month = String(time.getMonth()+1).padStart(2,"0");
          let day = String(time.getDate()).padStart(2,"0");
          let hour = String(time.getHours()).padStart(2,"0");
          let min = String(time.getMinutes()).padStart(2,"0");
          let sec = String(time.getSeconds()).padStart(2,"0");
          let timestr = `${year}/${month}/${day} ${hour}:${min}:${sec}`;
          array.push(
            <tr key={i}>
              <td>{payload.at(i).id}</td>
              <td>{payload.at(i).user_id}</td>
              <td>{payload.at(i).med_id}</td>
              <td>{timestr}</td>
            </tr>
          );
        }
        let elem = (
          <div>
            <Container>
              <Row>
                <div className="navbar"><NavBar /></div>
              </Row>
              <a className="m-2 btn btn-danger" style={{width:"90px"}} href={`/patientinfo/u${uid}`}>
                Back
              </a>
              <Row className="h-100 d-flex align-items-center justify-content-center">
                <Card>
                  <Card.Title className="m-2" style={{fontSize:"x-large",fontWeight:"bold"}}>
                    Medication History
                  </Card.Title>
                  <Table striped bordered hover className="m-2">
                    <thead>
                      <tr>
                        <td>Id</td>
                        <td>Medication Id</td>
                        <td>User Id</td>
                        <td>Medication Time</td>
                      </tr>
                    </thead>
                    <tbody>
                      {array}
                    </tbody>
                  </Table>
                </Card>
              </Row>
            </Container>
          </div>
        );
        this.setState({elem: elem, ready: true});
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
      return (
        <div className="MedicationHistory">
          {(this.state.ready) ? this.state.elem : <LoadingPage />}
        </div>
      );
    }
  }
  
}

export default MedHistory;