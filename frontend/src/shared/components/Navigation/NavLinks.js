import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserProvider from "../../context/UserProvider";
import _ from "lodash";

import "./NavLinks.css";

const NavLinks = () => {
  const userData = useContext(UserProvider.context);
  const notLogged = _.isEmpty(userData);

  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open(
      "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/steam",
      "_self"
    );
  };

  const _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open(
      "https://southamerica-east1-atiweb.cloudfunctions.net/getServers/api/users/logout",
      "_self"
    );
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Servidores
        </NavLink>
      </li>
      {!notLogged && (
        <li>
          <NavLink to="/create">Crear Sala</NavLink>
        </li>
      )}
      {notLogged && (
        <li>
          <button onClick={_handleSignInClick}>Ingresar</button>
        </li>
      )}
      {!notLogged && (
        <li>
          <button onClick={_handleLogoutClick}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
