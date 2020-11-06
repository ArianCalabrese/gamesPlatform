import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../../components/FormElements/Button";
import { AuthContext } from "../../context/auth-context";
import _ from "lodash";
import { useHttpClient } from "../../hooks/http-hook";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "./NavLinks.css";

const NavLinks = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/login/success"
        );
        console.log("responseData");
        console.log(responseData);
        if (!_.isEmpty(responseData)) {
          auth.asignUser(responseData);
          auth.login();
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest]);

  const _handleSignInClick = () => {
    window.open(
      "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/steam",
      "_self"
    );
  };

  const _handleLogoutClick = () => {
    auth.logout();
    window.open(
      "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/logout",
      "_self"
    );
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/" className="navbar-brand">
        ATI App
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink to="/" exact className="nav-link all-upper">
              Servidores
            </NavLink>
          </Nav.Link>
        </Nav>
        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        <Nav>
          {auth.isLoggedIn && (
            <Nav.Link>
              <NavLink to="/create" className="nav-link all-upper">
                Crear Sala
              </NavLink>
            </Nav.Link>
          )}
          {!auth.isLoggedIn && (
            <Nav.Link>
              <Button
                onClick={_handleSignInClick}
                className="nav-link all-upper"
              >
                Ingresar
              </Button>
            </Nav.Link>
          )}
          {auth.isLoggedIn && (
            <Nav.Link>
              <Button
                onClick={_handleLogoutClick}
                className="nav-link all-upper"
              >
                Salir
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    //   <ul class="nav navbar-nav navbar-right">
    //     <li className="nav-item">
    //       <NavLink to="/" exact className="nav-link all-upper">
    //         Servidores
    //       </NavLink>
    //     </li>
    //     {auth.isLoggedIn && (
    //       <li className="nav-item">
    //         <NavLink to="/create" className="nav-link all-upper">
    //           Crear Sala
    //         </NavLink>
    //       </li>
    //     )}
    //     {!auth.isLoggedIn && (
    //       <li className="nav-item">
    //         <Button onClick={_handleSignInClick} className="nav-link all-upper">
    //           Ingresar
    //         </Button>
    //       </li>
    //     )}
    //     {auth.isLoggedIn && (
    //       <li className="nav-item">
    //         <button onClick={_handleLogoutClick} className="nav-link all-upper">
    //           LOGOUT
    //         </button>
    //       </li>
    //     )}
    //   </ul>
    // </div>
  );
};

export default NavLinks;
