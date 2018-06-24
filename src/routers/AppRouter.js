import React from 'react';
import { Router, Route, Link, Switch, NavLink } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import Login from './../presentational/Login/Login';
import Dashboard from './../presentational/Dashboard/Dashboard';


export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/dashboard' exact component={Dashboard} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
