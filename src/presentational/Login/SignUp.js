import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "./../../actions/auth";
import { groups } from "./../../actions/groups";
import axios from "axios";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
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
  };

  handleSubmit = e => {
    e.preventDefault();
    const info = {
      name: this.state.name,
      userName: this.state.username,
      email: this.state.email,
      password: this.state.password,
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
      <div className="row">
        <div className="col s10 offset-s1 center">
          <form className="col s10" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  placeholder="name"
                  type="text"
                  className="validate"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="input-field col s6">
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
              <div className="input-field col s6">
                <input
                  placeholder="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                  onChange={this.onChangePassword}
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
