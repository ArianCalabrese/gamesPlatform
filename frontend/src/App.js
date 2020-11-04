import React, { useState, useContext } from "react";

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

import UserProvider from "./shared/context/UserProvider";
import { useHttpClient } from "./shared/hooks/http-hook";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useContext(UserProvider.context);

  let routes;

  if (userData) {
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
    <UserProvider>
      <Router>
        <MainNavigation />
        <main className="header">{routes}</main>
      </Router>
    </UserProvider>
  );
};

export default App;
