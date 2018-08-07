import React, { Component } from "react";
import SignUp from "./SignUp";
import LogUser from "./LogUser";

import videoMP4 from "./../../videos/Crosby_Street.mp4";
import videoWEBM from "./../../videos/Breezy.webm";

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
      <div className="background-cover">
        <div class="bg-video">
          <video class="bg-video__content" autoplay="autoplay" muted loop>
            <source src={videoMP4} type="video/mp4" />
            <source src={videoWEBM} type="video/webm" /> Your browser is not
            supported!
          </video>
        </div>
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
                      <div className="col s12 background-logo center">
                        <div className="row">
                          <div className="col s12 center">
                            <h5 className="login-logo">Mooch</h5>
                          </div>
                          <div className="col s12 center">
                            <h6 className="login-subtitle">
                              Take The Hassle Out Of Settling Debts
                            </h6>
                          </div>
                        </div>
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
