import React, { Component } from 'react'
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import Login from './presentational/Login/Login'
import Dashboard from './presentational/Dashboard/Dashboard'


class App extends Component {
  componentDidMount() {
    
  }

  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path = "/" component = {Login}  />
            <Route exact path = "/dashboard" component = {Dashboard} />
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App
