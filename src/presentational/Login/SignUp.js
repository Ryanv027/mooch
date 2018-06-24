import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: ""
  };
  onChangeName = e => {
    const name = e.target.value;
    console.log(name);
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
    console.log("hit submit");
    const info = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/users", info)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render = () => {
    return (
      <div className="row">
        <div className = "col s10 offset-s1 center">
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
          <button className = "btn waves-effect waves light">submit</button>
        </form>
        </div>
      </div>
    );
  };
}

export default SignUp;
