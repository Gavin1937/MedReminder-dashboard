import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import { Cookies } from "react-cookie";

class Home extends Component {
  
  render() {
    const cookie = new Cookies();
    let username = cookie.get("username");
    if (username === null || username === undefined || username === '') {
      username = sessionStorage.getItem("username");
    }
    if (username === null || username === undefined || username === '') {
      return (
        <Navigate to="/login" />
      );
    }
    else {
      return (
        <div className="Home">
          <h1>Home Page.</h1>
          <h2>Hello: {username}</h2>
        </div>
      );
    }
  }
  
}

export default Home