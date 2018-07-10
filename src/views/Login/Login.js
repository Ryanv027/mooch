import React, { Component } from "react";
import SignUp from "./SignUp";
import LogUser from "./LogUser";
import "./Login.css";

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
      <div className="container">
        <div className="section" />

        {this.state.signUp ? (
          <SignUp
            handleSignUp={this.handleSignUp}
            history={this.props.history}
            handleHome={this.handleHome}
          />
        ) : null}

        {this.state.logIn ? (
          <LogUser history={this.props.history} handleHome={this.handleHome} />
        ) : null}

        {this.state.neither ? (
          <center>
            <div className="z-depth-5 grey lighten-4 row prime">
              <img
                className="responsive-img"
                alt="moneyMan"
                src="https://img.clipartxtras.com/9a573c6c1389f488f5675fd71fb6bb36_new-age-monopolies-monopoly-economics-clipart_1166-1273.png"
              />
              <div className="section" />
              <h5 className="black-text">WELCOME TO MOOCH</h5>
              <h6 className="black-text">
                Take The Hassle Out Of Settling Debts
              </h6>
              <div className="section" />
              <form className="col s12" method="post">
                <br />
                <center>
                  <div className="row">
                    <button
                      type="button"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect waves-light green-accent-2"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect waves-light green-accent-2"
                      onClick={this.handleSignUp}
                    >
                      Create Account
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </center>
        ) : null}
      </div>
    );
  };
}

export default Login;
