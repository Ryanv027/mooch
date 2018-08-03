import React, { Component } from "react";
import SignUp from "./SignUp";
import LogUser from "./LogUser";

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

  handleHome = () => {
    this.setState({
      signUp: false,
      logIn: false,
      neither: true
    });
  };

  render = () => {
    return (
      <div className="login-main-background">
        <div className="login-container">
          <div className="section" />

          {this.state.signUp ? (
            <SignUp
              handleSignUp={this.handleSignUp}
              history={this.props.history}
              handleHome={this.handleHome}
            />
          ) : null}

          {this.state.logIn ? (
            <LogUser
              history={this.props.history}
              handleHome={this.handleHome}
            />
          ) : null}

          {this.state.neither ? (
            <div className="center">
              <div className="row">
                <div className="col l8 s12 offset-l2">
                  <div className="login-box">
                    <div className="row">
                      <div className="col l8 s12 offset-l2">
                        <img
                          className="img-dimension"
                          alt="moneyMan"
                          src="https://img.clipartxtras.com/9a573c6c1389f488f5675fd71fb6bb36_new-age-monopolies-monopoly-economics-clipart_1166-1273.png"
                        />
                      </div>
                      <div className="col s8 offset-s2">
                        <h5 className="black-text font-top">
                          WELCOME TO MOOCH
                        </h5>
                        <h6 className="black-text login-font font-bottom">
                          Take The Hassle Out Of Settling Debts
                        </h6>
                      </div>
                      <div className="col s6 offset-s3">
                        <button
                          className="main-button"
                          onClick={this.handleLogin}
                        >
                          Login
                        </button>
                      </div>
                      <div className="col s6 offset-s3">
                        <button
                          className="main-button"
                          onClick={this.handleSignUp}
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
}

export default Login;
