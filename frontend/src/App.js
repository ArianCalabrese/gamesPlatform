import React, { useState, useCallback } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ServersCreated from "./servers/pages/ServersCreated";
import Formulario from "./servers/pages/Formulario";
import Login from "./users/pages/Login";
import { AuthContext } from "./shared/context/auth-context";
import { useHttpClient } from "./shared/hooks/http-hook";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  //
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const asignUser = useCallback((usuario) => {
    setUser(usuario);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <ServersCreated />
        </Route>
        <Route path="/create" exact>
          <Formulario />
        </Route>
        <Redirect to="/" />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact>
          <ServersCreated />
        </Route>{" "}
        <Redirect to="/" />
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout, user:user, asignUser:asignUser }}
    >
      <Router>
        <MainNavigation />
        <Switch>
          <main className="header">{routes}</main>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
