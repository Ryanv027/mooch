import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import createHistory from "history/createBrowserHistory";

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
            {this.props.data.length > 1 ? (
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/group" component={Group} />
              </Switch>
            ) : (
              <Route exact path="/" component={Login} />
            )}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: state.auth
});

export default connect(mapStateToProps)(AppRouter);
