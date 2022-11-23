import { Component } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';


class PatientInfo extends Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    if (Cookies.get("username") === undefined) {
      return (
        <Navigate to="/login" />
      );
    }
    else {
      return <h1>No Content</h1>;
    }
  }
  
}

export default PatientInfo;