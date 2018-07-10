import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import createHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "./../views/Login/Login";
import Dashboard from "./../views/Dashboard/Dashboard";
import Group from "./../views/Group/Group";
import NotFound from "./../views/Login/NotFound";
import CreateGroup from "./../views/Group/CreateGroup";

export const history = createHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute path="/" component={Login} exact />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/createGroup" component={CreateGroup} />
          <PrivateRoute path="/group/:id" component={Group} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect()(AppRouter);
