import React from "react";
import "../style/App.css";

import { useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "./Navigation";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Protected from "./Protected";
import PageNotFound from "./PageNotFound";

import Login from "./Login";
import Verify from "./protected-components/Verification";
import Center from "./protected-components/Center";

const App = () => {
  const [authentication, setAuthentication] = useState(false);
  const [verifyAuth, setVerifyAuth] = useState(false);
  const [txn, setTxn] = useState("");
  return (
    <div className="App">
      <Navigation logoutBtn={verifyAuth} />
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
        <Route exact path="/login">
          <Login setTxn={setTxn} setAuthentication={setAuthentication} />
        </Route>

        <Protected
          txn={txn}
          path="/verify"
          component={Verify}
          auth={authentication}
          setVerifyAuth={setVerifyAuth}
        />
        <Protected path="/center" component={Center} auth={true} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
//auth={verifyAuth}
