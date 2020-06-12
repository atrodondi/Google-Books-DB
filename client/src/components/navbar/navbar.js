import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function navbar(props) {
  
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand style={{ color: props.navbarColor }} href="/">
        {props.navbarText}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="mr-auto">
          <Nav.Link href="/">Search</Nav.Link>
          <Nav.Link href="/saved">Saved</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default navbar;
