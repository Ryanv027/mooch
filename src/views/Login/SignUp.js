import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import bcrypt from "bcryptjs";

import { login } from "./../../actions/auth";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    hashedPassword: "",
    loading: false,
    passwordError: "",
    usernameError: "",
    emailError: ""
  };

  onChangeName = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  onChangeUsername = e => {
    const username = e.target.value;
    this.setState({ username });
  };

  onChangeEmail = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  onChangePassword = e => {
    const password = e.target.value;
    this.setState({ password });
    const salt = "$2a$10$psHwfCgWu.Zw2dh3Xk/swu";

    bcrypt.hash(password, salt, (error, hash) => {
      this.setState({ hashedPassword: hash });
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.checkUsername();
  };

  checkUsername = () => {
    const userName = this.state.username.toLowerCase();
    axios
      .get("/api/checkUserName", {
        params: { userName: userName }
      })
      .then(response => {
        if (response.data === "valid") {
          this.setState({ usernameError: false });
          this.checkPassword();
        } else if (response.data === "invalid") {
          this.setState({ usernameError: "*Username already exists" });
        }
      });
  };

  checkPassword = () => {
    if (this.state.password.length > 5) {
      this.setState({ passwordError: false });
      this.checkEmail();
    } else {
      this.setState({
        passwordError:
          "*Please enter a valid password length (6 or more characters)"
      });
    }
  };

  checkEmail = () => {
    axios
      .get("/api/checkEmail", { params: { email: this.state.email } })
      .then(response => {
        if (response.data === "valid") {
          this.setState({ emailError: false });
          this.sendInfo();
        } else {
          this.setState({ emailError: "*Email already exists!" });
        }
      });
  };

  sendInfo = () => {
    const info = {
      name: this.state.name,
      userName: this.state.username.toLowerCase(),
      email: this.state.email,
      password: this.state.hashedPassword,
      groups: []
    };

    axios
      .post("/api/userSignUpInfo", info)
      .then(response => {
        if (response) {
          const userInfo = {
            userID: response.data.userID,
            userName: response.data.userName
          };
          this.props.login(userInfo);
          this.props.history.push("/dashboard");
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
                <div className="col s1 l2">
                  <p className="back-button" onClick={this.props.handleHome}>
                    &larr; Back
                  </p>
                </div>
                <div className="col l8 s10">
                  <img
                    className="img-dimension"
                    alt="moneyMan"
                    src="https://img.clipartxtras.com/9a573c6c1389f488f5675fd71fb6bb36_new-age-monopolies-monopoly-economics-clipart_1166-1273.png"
                  />
                </div>

                <div className="col s12">
                  <h5 className="login-title">WELCOME TO MOOCH</h5>
                  <h6 className="login-subtitle">
                    Take The Hassle Out Of Settling Debts
                  </h6>
                </div>

                <div className="col s8 offset-s2">
                  <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          placeholder="name"
                          type="text"
                          className="validate"
                          value={this.state.name}
                          onChange={this.onChangeName}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s10 offset-s1">
                        <p className="error">{this.state.usernameError}</p>
                      </div>
                      <div className="input-field col s12">
                        <input
                          placeholder="username"
                          type="text"
                          className="validate"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s10 offset-s1">
                        <p className="error">{this.state.emailError}</p>
                      </div>
                      <div className="input-field col s12">
                        <input
                          placeholder="email"
                          type="email"
                          className="validate"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s10 offset-s1">
                        <p className="error">{this.state.passwordError}</p>
                      </div>
                      <div className="input-field col s12">
                        <input
                          placeholder="password"
                          type="password"
                          className="validate"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s10 offset-s1">
                        <button
                          type="submit"
                          name="btn_login"
                          className="main-button"
                        >
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
  login: userInfo => {
    return dispatch(login(userInfo));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(SignUp);
