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
          <button onClick={this.getGroupNames}>test</button>
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
