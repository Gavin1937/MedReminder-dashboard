import { Component } from "react"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../css/NavEffect.css"

class NavBar extends Component {
  
  render() {
    return (
      <Navbar fixed="top" sticky="top" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="/home">MedReminder</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="nav-links" href="/listpatient">Patient List</Nav.Link>
              <Nav.Link className="nav-links" href="/searchpatient">Search & Manage Patient</Nav.Link>
              <Nav.Link className="nav-links" href="/searchmed">Search & Manage Medication</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
}

export default NavBar;