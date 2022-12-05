import { Component } from 'react'
import {
  Navigate
} from 'react-router-dom';
import Cookies from 'js-cookie';

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
        <div className="Home">
          <h1>Home</h1>
          <h2>Hello: {this.state.fname+' '+this.state.lname}</h2>
          <h2>Contact Info</h2>
          <h3>Phone: {this.state.phone}</h3>
          <h3>Email: {this.state.email}</h3>
          <h3><a href="/listpatient">Patient List</a></h3>
          <h3><a href="/searchpatient">Search & Manage Patient</a></h3>
          <h3><a href="/searchmed">Search & Manage Medication</a></h3>
        </div>
      );
    }
  }
  
}

export default Home;