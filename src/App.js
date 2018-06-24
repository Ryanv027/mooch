import React, { Component } from 'react'
import { BrowserRouter , Switch , Route } from 'react-router-dom'
import Login from './presentational/Login/Login'
import Dashboard from './presentational/Dashboard/Dashboard'
import Group from './presentational/Group/Group'
// import Navbar from './presentational/Navbar/Navbar'


class App extends Component {
  
  state = {
    user : true
  }

  componentDidMount = () => {
    
  }

  render = () => {
    return (
        <BrowserRouter>
          <Switch>
            {this.state.user ?
              <Switch>
                <Route exact path = "/dashboard" component = {Dashboard} />
                <Route exact path = "/group" component = {Group} />
              </Switch>
            : <Route exact path = "/" component = {Login}  />}
          </Switch>
        </BrowserRouter>
    )
  }
}

export default App
