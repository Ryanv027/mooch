import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "../Navbar/Navbar";

class Group extends Component {
  state = {
    groupName: "",
    groupID: "",
    users: []
  };
  componentDidMount = () => {
    this.addGroupsToDatabase();
    this.setGroupData();
  };

  setGroupData = () => {
    axios
      .get("/api/groupData", {
        params: { groupID: this.props.match.params.id }
      })
      .then(response => {
        this.setState({
          groupName: response.data.groupName,
          groupID: response.data.groupID
        });
        this.setUsersData(response.data.users);
      });
  };

  setUsersData = users => {
    Promise.all(
      users.map(user => {
        return axios.get(`/api/groupUsers/${user}`);
      })
    ).then(response => {
      const users = response.map(data => {
        return {
          userID: data.data.userID,
          userName: data.data.userName,
          email: data.data.email
        };
      });
      this.setState({ users });
    });
  };

  addGroupsToDatabase = () => {
    const info = { groups: this.props.groups, userID: this.props.id };
    axios.put("/api/addGroupToUser", info);
  };

  render = () => {
    const users = this.state.users.map(user => {
      return <li>{user.userName}</li>;
    });
    return (
      <div>
        <Navbar history={this.props.history} />
        <h1>{this.state.groupName}</h1>
        <br />
        <h4 />
        <h3>List of Users</h3>
        <ul>{users}</ul>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups,
  id: state.auth.userID
});

export default connect(mapStateToProps)(Group);
