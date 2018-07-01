import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/auth";
import { groups } from "./../../actions/groups";
import axios from "axios";

class LogUser extends Component {
  state = {
    userName: "",
    password: ""
  };
  onChangeUsername = e => {
    const userName = e.target.value;
    this.setState({ userName });
  };
  onChangePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

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
        if (response) {
          const userID = {
            userID: response.data.userID
          };
          const groupIDs = response.data.groups;

          this.props.login(userID);
          this.props.groups(groupIDs);
          this.props.history.push("/dashboard");
        }
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
                  value={this.state.userName}
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
  },
  groups: groupIDs => {
    return dispatch(groups(groupIDs));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LogUser);
