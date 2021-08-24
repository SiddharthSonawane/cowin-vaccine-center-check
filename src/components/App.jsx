import React from "react";
import "../style/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";
import Otp from "./sub-components/Otp";
import Center from "./sub-components/Center";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/otp">
            <Otp />
          </Route>
          <Route path="/center">
            <Center />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
