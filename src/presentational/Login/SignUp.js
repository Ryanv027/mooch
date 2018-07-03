import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/auth";
import { groups } from "./../../actions/groups";
import axios from "axios";
import bcrypt from "bcryptjs";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    hashedPassword: "",
    loading: false
  };
  componentDidMount() {
    // console.log(this.props);
  }

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
    const info = {
      name: this.state.name,
      userName: this.state.username,
      email: this.state.email,
      password: this.state.hashedPassword,
      groups: []
    };
    axios
      .post("/api/users", info)
      .then(response => {
        if (response) {
          const userID = {
            userID: response.data
          };
          const groupIDs = [];
          this.props.login(userID);
          this.props.groups(groupIDs);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => {
    return (
      <div className="container">
        <div className="section" />
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
                  <div className="col s12 center">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="input-field">
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
                        <div className="input-field">
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
                        <div className="input-field">
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
                        <div className="input-field">
                          <input
                            placeholder="password"
                            type="password"
                            className="validate"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </div>
                      </div>
                      <button className="btn waves-effect waves light">
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </center>
            </form>
          </div>
        </center>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  login: userID => {
    return dispatch(login(userID));
  },
  groups: groupIDs => {
    return dispatch(groups(groupIDs));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(SignUp);
