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
    userIDs: [],
    usersInfo: [],
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
    if (user.length > 0) {
      axios.get(`/api/user/${user}`).then(response => {
        //console.log(response);
        if (response.data.userName === user) {
          //setting userdata to state to access later for our axios.put call
          const userData = {
            user: user,
            userID: response.data.userID,
            groups: response.data.groups
          };
          const usersInfo = [...this.state.usersInfo, userData];
          //setting up this array to use when creating the group, we will add an array of user id's to the groups table.
          const userIDs = [...this.state.userIDs, response.data.userID];
          this.setState({
            userName: "",
            error: "",
            userIDs: userIDs,
            usersInfo: usersInfo
          });
        } else {
          this.setState({ error: "Please enter a valid username" });
        }
      });
    }
  };

  // addGroupsToDatabase = () => {
  //   const info = { groups: this.props.groups, userID: this.props.id };
  //   axios.put("/api/addGroupToUser", info);
  // };

  handleSubmit = e => {
    e.preventDefault();
    const groupInfo = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      users: this.state.userIDs
    };
    axios
      .post("/api/createGroup", groupInfo)
      .then(response => {
        const group = response.data;
        Promise.all(
          this.state.usersInfo.map(user => {
            const updatedGroups = [...user.groups, group];
            const info = { groups: updatedGroups, userID: user.userID };
            return axios.put("/api/addGroupToUser", info);
          })
        ).then(response => {
          console.log(response);
          this.props.addGroup(group);
          this.props.history.push(`/group/${group}`);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteUser = userID => {
    const filteredUserInfo = this.state.usersInfo.filter(user => {
      if (user.userID !== userID) {
        return user;
      }
    });
    const filteredUserIDs = this.state.userIDs.filter(user => {
      if (user !== userID) {
        return user;
      }
    });
    this.setState({ usersInfo: filteredUserInfo, userIDs: filteredUserIDs });
  };

  render() {
    const users = this.state.usersInfo.map((user, index) => {
      return (
        <div key={index}>
          <h1>{user.user}</h1>
          <button onClick={() => this.deleteUser(user.userID)}>X</button>
        </div>
      );
    });
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

        <h1>{users}</h1>
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

//ADD USERS TO A USER STATE AND THEN WHEN THE GROUP IS CREATED USE THOSE USER IDS TO ADD THIS GROUP ID TO THEIR INDIVIDUAL TABLE.
