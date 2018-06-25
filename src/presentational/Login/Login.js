import React, { Component } from "react";
//import axios from 'axios';
import SignUp from "./SignUp";
import LogUser from "./LogUser";
import styles from "./Login.css";

class Login extends Component {
  state = {
    user: {},
    signUp: false,
    logIn: false,
    neither: true
  };

  handleLogin = () => {
    this.setState({
      logIn: true,
      neither: false
    });
  };

  handleSignUp = () => {
    this.setState({
      signUp: true,
      neither: false
    });
  };
  render = () => {
    return (
      <div>
        {this.state.signUp ? (
          <SignUp
            handleSignUp={this.handleSignUp}
            history={this.props.history}
          />
        ) : null}
        {this.state.logIn ? <LogUser history={this.props.history} /> : null}
        {this.state.neither ? (
          <div className="row">
            <div className="col s8">
              <div className={styles.loginContainer}>
                <h1>Login...if you dare.</h1>
                <div className="row">
                  <div className="col s6">
                    <button
                      className="btn waves-effect waves-light"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <div className="col s6">
                    <button
                      className="btn waves-effect waves-light"
                      onClick={this.handleSignUp}
                    >
                      sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
}

export default Login;
