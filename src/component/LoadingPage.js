import { Component } from "react";

// react-boostrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";


class LoadingPage extends Component {
  
  render(){
    return (
      <div className="m-2 h-100 d-flex align-items-center justify-content-center">
        <Card style={{ width: "18rem", height: "18rem" }} className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status" />
          <Card.Title>Loading...</Card.Title>
        </Card>
      </div>
    );
  }
  
}

export default LoadingPage;