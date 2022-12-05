import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';


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
          <h1>Medication Information</h1>
          <h3>Id: {this.state.payload.id}</h3>
          <h3>Name: {this.state.payload.name}</h3>
          <h3>Description: {this.state.payload.description}</h3>
          <h3>Frequency: {this.state.payload.frequency}</h3>
          <h3>Early Time: {this.state.payload.early_time}</h3>
          <h3>Late Time: {this.state.payload.late_time}</h3>
          <h3><a href="/searchmed">Medication Search</a></h3>
        </div>
      );
    }
    else {
      return null;
    }
  }
  
}

export default MedInfo;