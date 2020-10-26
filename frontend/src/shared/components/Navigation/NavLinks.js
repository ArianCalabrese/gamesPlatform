import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";


const NavLinks = () => {
  const auth = useContext(AuthContext);

  const _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:5000/api/users/steam", "_self");
  };
  
  const _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/api/users/logout", "_self");
    auth.logout();

  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Servidores
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/create">Crear Sala</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <button onClick={_handleSignInClick}>Ingresar</button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={_handleLogoutClick}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
