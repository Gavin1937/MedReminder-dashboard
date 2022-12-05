import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';


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
          <h1>This Patient Isn't In Our System</h1>
        </div>
      );
    }
    else if (this.state.ready && this.state.notUser === false) {
      return (
        <div className="PatientInfo">
          <h1>Patient Information</h1>
          <h2>Name: {this.state.payload.pat_info.fname+' '+this.state.payload.pat_info.lname}</h2>
          <h2>Contact Info</h2>
          <h3>Phone: {this.state.payload.pat_info.phone}</h3>
          <h3>Email: {this.state.payload.pat_info.email}</h3>
        </div>
      );
    }
    else {
      return null;
    }
  }
  
}

export default PatientInfo;