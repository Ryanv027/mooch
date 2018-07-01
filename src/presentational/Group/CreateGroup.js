import React from "react";
import { connect } from "react-redux";
import Navbar from "./../Navbar/Navbar";
import axios from "axios";
import { addGroup } from "./../../actions/groups";

class CreateGroup extends React.Component {
  state = {
    groupName: "",
    groupType: "",
    userName: "",
    users: [],
    error: ""
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
    const user = this.state.userName;
    axios.get(`/api/${user}`).then(response => {
      if (response.data === user) {
        const users = [...this.state.users, user];
        this.setState({ users: users, userName: "", error: "" });
      } else {
        this.setState({ error: "Please enter a valid username" });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const groupInfo = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      users: this.state.users
    };
    axios
      .post("/api/createGroup", groupInfo)
      .then(response => {
        const groupID = response.data;
        this.props.addGroup(groupID);
        this.props.history.push(`/group/${groupID}`);
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
          <h6>Group Name</h6>
          <input
            type="text"
            value={this.state.groupName}
            onChange={this.handleGroupName}
          />
          <h6>Type</h6>
          <input
            type="text"
            value={this.state.groupType}
            onChange={this.handleGroupType}
          />
          <h6>Username</h6>
          <p>{this.state.error}</p>
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
        <br />

        <h1>{this.state.users}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addGroup: groupID => {
    return dispatch(addGroup(groupID));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(CreateGroup);

//need to validate users
//need to update redux as well as create a new table in the groups database
