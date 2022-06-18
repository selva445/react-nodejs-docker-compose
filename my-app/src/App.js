import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import StaffPage from "./components/StaffPage";
import { oktaConfig } from "./lib/oktaConfig";
import  Home  from "./components/Home";
const App = () => {
  const CALLBACK_PATH = "/login/callback";

  const oktaAuth = new OktaAuth(oktaConfig);

  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="App ">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path={CALLBACK_PATH} exact component={LoginCallback} />
          <SecureRoute path="/StaffPage" exact component={StaffPage} />
        </Switch>
      </Security>
    </div>
  );
};

export default App;
