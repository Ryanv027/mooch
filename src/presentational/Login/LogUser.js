import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/auth";
import axios from "axios";

class LogUser extends Component {
  state = {
    username: "",
    password: ""
  };
  onChangeUsername = e => {
    const username = e.target.value;
    this.setState({ username });
  };
  onChangePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleSubmit = e => {
    e.preventDefault();
    const info = {
      userName: this.state.username,
      password: this.state.password
    };
    axios
      .get("/api/users", {
        params: {
          userName: this.state.username,
          password: this.state.password
        }
      })
      .then(response => {
        const id = { userID: response.data };
        this.props.login(id);
        this.props.history.push("/dashboard");
      })
      .catch();
  };
  render = () => {
    return (
      <div className="row">
        <div className="col s10 offset-s1 center">
          <form className="col s10" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="username"
                  type="text"
                  className="validate"
                  onChange={this.onChangeUsername}
                  value={this.state.username}
                />
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="password"
                  type="password"
                  className="validate"
                  onChange={this.onChangePassword}
                  value={this.state.password}
                />
              </div>
            </div>
            <button className="btn waves-effect waves light">submit</button>
          </form>
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  login: info => {
    return dispatch(login(info));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LogUser);
