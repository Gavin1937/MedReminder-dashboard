import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';
import PatientTable from './PatientTable';
import NavBar from "../component/NavBar";
import LoadingPage from './LoadingPage';

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class ListPatient extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      payload: null,
      prev_page: null,
      next_page: null,
      ready: false
    };
    
    this.getPatientInfo = this.getPatientInfo.bind(this);
  }
  
  componentDidMount() {
    this.getPatientInfo();
  }
  
  getPatientInfo = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'username': Cookies.get("username"),
        'secret': Cookies.get("secret")
      }
    };
    
    let search = new URLSearchParams(window.location.search);
    let page = search.get("p");
    page = (page === undefined || page === null) ? 1 : page;
    fetch(`/api/user/mypatients/${page}`, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let payload = data.payload;
        let prev_page = null;
        let next_page = null;
        if (payload.this_page > 1)
          prev_page = `/listpatient?p=${payload.this_page-1}`;
        next_page = `/listpatient?p=${payload.next_page}`;
        this.setState({payload: payload, prev_page: prev_page, next_page: next_page, ready: true});
      })
      .catch(error => {
          console.log(error);
      });
  }
  
  render() {
    if (Cookies.get("username") === undefined) {
      return (
        <div className='ListUser'>
          <Navigate to="/login" />
        </div>
      );
    }
    else {
      return (
        <div className='ListUser'>
          <Container>
            <Row>
              <div className="navbar"><NavBar /></div>
            </Row>
            {(this.state.ready) ? <PatientTable payload={this.state.payload} prev_page={this.state.prev_page} next_page={this.state.next_page} /> : <LoadingPage />}
          </Container>
        </div>
      );
    }
  }
  
}

export default ListPatient;