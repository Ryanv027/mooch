import React from "react";
import Navbar from "./../Navbar/Navbar";
import axios from "axios";
import uuid from "uuid";

export default class CreateGroup extends React.Component {
  state = {
    groupName: "",
    groupType: "",
    userName: "",
    users: []
  };
  handleGroupName = e => {
    const groupName = e.target.value;
    this.setState({ groupName });
  };

  handleGroupType = e => {
    const groupType = e.target.value;
    this.setState({ groupType });
  };

  handleUserName = e => {
    const userName = e.target.value;
    this.setState({ userName });
  };

  handleAddUser = () => {
    console.log("add user hit");
    const user = this.state.userName;
    const users = [...this.state.users, user];
    // axios.get("/api/users").then(response => {
    //   if (response === "confirm") {
    //     this.setState({ users: users, userName: "" });
    //   }
    // });
    this.setState({ users: users, userName: "" });
  };

  handleSubmit = e => {
    console.log("hit submit");
    e.preventDefault();
    const groupInfo = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      users: this.state.users
    };
    axios
      .post("/api/createGroup", groupInfo)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        <form onSubmit={this.handleSubmit}>
          Group Name
          <input
            type="text"
            value={this.state.groupName}
            onChange={this.handleGroupName}
          />
          Type
          <input
            type="text"
            value={this.state.groupType}
            onChange={this.handleGroupType}
          />
          Username
          <input
            type="text"
            value={this.state.userName}
            onChange={this.handleUserName}
          />
          <button
            type="button"
            className="add-user-button"
            onClick={this.handleAddUser}
          >
            +
          </button>
          <button type="submit">Submit</button>
        </form>
        {this.state.users}
      </div>
    );
  }
}
