import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import _ from "lodash";
import { useHttpClient } from "../../hooks/http-hook";

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
