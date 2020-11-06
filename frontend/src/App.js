import React, { useState, useContext, useCallback } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ServersCreated from "./servers/pages/ServersCreated";
import Formulario from "./servers/pages/Formulario";
import ServerInfo from "./servers/pages/ServerInfo";

import { AuthContext } from "./shared/context/auth-context";
import { useHttpClient } from "./shared/hooks/http-hook";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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
      <Switch>
        <Route path="/" exact>
          <ServersCreated />
        </Route>
        <Route path="/create" exact>
          <Formulario />
        </Route>
        <Route path="/:serverId">
          <ServerInfo />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <ServersCreated />
        </Route>{" "}
        <Route path="/:serverId">
          <ServerInfo />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        user: user,
        asignUser: asignUser,
      }}
    >
      <Router>
        <MainNavigation />
        <main className="header">{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
