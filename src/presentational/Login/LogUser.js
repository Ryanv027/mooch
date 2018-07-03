import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/auth";
import { groups } from "./../../actions/groups";
import axios from "axios";
import bcrypt from "bcryptjs";

class LogUser extends Component {
  state = {
    userName: "",
    password: "",
    hashedPassword: ""
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

  setReduxState = response => {
    const userID = response.data.userID;
    const groupInfo = response.data.groups;

    this.props.login(userID);
    this.props.groups(groupInfo);
    this.props.history.push("/dashboard");
  };

  // getGroupNames = data => {
  //   const id = data.data.groups[0];
  //   console.log(id);
  //   axios
  //     .get("/api/getGroupData", { params: { groupID: id } })
  //     .then(response => {
  //       console.log(response);
  //       const userInfo = {
  //         userID: data.data.userID,
  //         group: [
  //           {
  //             id: data.data.groups[0],
  //             name: response.data
  //           }
  //         ]
  //       };
  //       this.setReduxState(userInfo);
  //     });
  // };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .get("/api/users", {
        params: {
          userName: this.state.userName,
          password: this.state.password
        }
      })
      .then(response => {
        //console.log(response);
        if (response) {
          this.setReduxState(response);
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
                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="text"
                      name="username"
                      id="username"
                    />
                    <label for="username">Enter your username</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      className="validate"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <label for="password">Enter your password</label>
                  </div>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect waves-light green-accent-2"
                      onClick={this.handleLogin}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect waves-light green-accent-2"
                      onClick={this.props.handleHome}
                    >
                      Home
                    </button>
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
  groups: groupInfo => {
    return dispatch(groups(groupInfo));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LogUser);
