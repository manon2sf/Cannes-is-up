import React, { Component } from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./NavbarAdmin.css";
import { Redirect } from "react-router-dom";

class NavbarAdmin extends Component {
  deconnexion = () => {
    // en cas de deconnexion, enleve les elements du localstorage
    this.setState({ connecte: false });
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("admin");
    return <Redirect to="https://cannesisup.com/#actus" />;
  };

  render() {
    return (
      <Navbar bg="light" expand="lg" className="adminNavContainer">
        <img src="/assets/img/logocopie.png" alt="logo" className="topLogo" />
        <Navbar.Brand className="ml-100pc" href="#home">
          Cannes is Up back-office Administrateur
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-100px">
            <Nav.Link href="https://cannesisup.com/#home" className="ml-10pc">
              Site
            </Nav.Link>
            <Nav.Link href="/admin/charts" className="ml-10pc">
              Charts
            </Nav.Link>
            <Nav.Link href="/admin/annuaire" className="ml-10pc">
              Adherents
            </Nav.Link>
            <NavDropdown
              title="Parametres"
              id="basic-nav-dropdown"
              className="ml-10pc"
            >
              <NavDropdown.Item href="">Modifier mail</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/passwordreset">
                Modifier mot de passe
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/signin"
              onClick={this.deconnexion}
              className="ml-10pc"
            >
              Deconnexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavbarAdmin;
