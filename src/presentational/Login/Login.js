import React, { Component } from "react";
//import axios from 'axios';
import { login } from "./../../actions/auth";
import { connect } from "react-redux";
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

  componentDidMount = () => {
    console.log(this.state.user);
  };

  componentDidUpdate = () => {
    console.log(this.state.user);
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
        {this.state.logIn ? <LogUser /> : null}
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

const mapStateToProps = (state, props) => ({
  data: state.auth
});

const mapDispatchToProps = dispatch => ({
  Login: id => {
    console.log("hit login dispatch");
    return dispatch(login(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
