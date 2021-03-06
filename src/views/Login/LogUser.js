import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import bcrypt from "bcryptjs";

import { login } from "./../../actions/auth";
import { groups } from "./../../actions/groups";

class LogUser extends Component {
  state = {
    userName: "",
    password: "",
    hashedPassword: "",
    loginError: ""
  };

  onChangeUsername = e => {
    const userName = e.target.value;
    this.setState({ userName });
  };

  onChangePassword = e => {
    const password = e.target.value;
    this.setState({ password });

    const salt = "$2a$10$psHwfCgWu.Zw2dh3Xk/swu";
    bcrypt.hash(password, salt, (error, hash) => {
      this.setState({ hashedPassword: hash });
    });
  };

  settingUserReduxState = response => {
    const userInfo = {
      userID: response.data.userID,
      userName: response.data.userName
    };
    const groups = response.data.groups;

    this.props.login(userInfo);
    this.props.groups(groups);
    this.props.history.push("/dashboard");
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .get("/api/getUserLoginInfo", {
        params: {
          userName: this.state.userName.toLowerCase(),
          password: this.state.password
        }
      })
      .then(response => {
        if (response.data === "user not found") {
          this.setState({ loginError: "*Username not found" });
        } else if (response.data === "password invalid") {
          this.setState({ loginError: "*Password invalid" });
        } else {
          this.settingUserReduxState(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    return (
      <div className="center">
        <div className="row">
          <div className="col l8 s12 offset-l2">
            <div className="login-box">
              <div className="row">
                <div className="col s12 background-logo center">
                  <div className="row relative">
                    <button
                      className="back-button--login back-button"
                      onClick={this.props.handleHome}
                    >
                      &larr;Back
                    </button>

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

                <div className="col s10 offset-s1">
                  <p className="error">{this.state.loginError}</p>
                </div>

                <div className="col s8 offset-s2">
                  <form onSubmit={this.handleSubmit}>
                    <br />
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          className="validate"
                          type="text"
                          name="username"
                          placeholder="username"
                          id="username"
                          onChange={this.onChangeUsername}
                          value={this.state.username}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 margin-top-small">
                        <input
                          className="validate"
                          type="password"
                          name="password"
                          placeholder="password"
                          id="password"
                          onChange={this.onChangePassword}
                          value={this.state.password}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col l4 s10 offset-s1 offset-l4">
                        <button type="submit" className="main-button">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  login: userID => {
    return dispatch(login(userID));
  },
  groups: groupInfo => {
    return dispatch(groups(groupInfo));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LogUser);
