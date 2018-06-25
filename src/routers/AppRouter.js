import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import createHistory from "history/createBrowserHistory";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "./../presentational/Login/Login";
import Dashboard from "./../presentational/Dashboard/Dashboard";
import Group from "./../presentational/Group/Group";

export const history = createHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <PublicRoute path="/" component={Login} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(AppRouter);
