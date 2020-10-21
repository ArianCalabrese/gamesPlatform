import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import ServersCreated from "./servers/pages/ServersCreated";
import Formulario from "./servers/pages/Formulario";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main className="header">
        <Switch>
          <Route path="/" exact>
            <ServersCreated />
          </Route>
          <Route path="/create" exact>
            <Formulario />
            </Route>
        </Switch>
        <Redirect to="/" />
      </main>
    </Router>
  );
}

export default App;
