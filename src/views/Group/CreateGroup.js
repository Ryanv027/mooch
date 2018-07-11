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
    groupUserData: [],
    invalidUsernameError: ""
  };

  componentDidMount = () => {
    const loggedUserData = [
      {
        userName: this.props.userName,
        userID: this.props.userID,
        groups: this.props.userGroups
      }
    ];
    this.setState({ groupUserData: loggedUserData });
  };

  onChangeGroupName = e => {
    const groupName = e.target.value;
    this.setState({ groupName });
  };

  onChangeGroupType = e => {
    const groupType = e.target.value;
    this.setState({ groupType });
  };

  onChangeUserName = e => {
    const userName = e.target.value;
    this.setState({ userName });
  };

  checkUserNameValidity = () => {
    const userName = this.state.userName.toLowerCase();

    if (userName.length > 0) {
      axios
        .get(`/api/userCheckCreateGroup`, { params: { userName: userName } })
        .then(response => {
          console.log(response);
          if (response.data.userName === this.props.userName) {
            this.setState({
              invalidUsernameError: "You cannot enter your own username!"
            });
          } else if (response.data !== "invalid") {
            //setting userdata to state to access later for our axios.put call
            const userData = {
              userName: userName,
              userID: response.data.userID,
              groups: response.data.groups
            };
            const usersInfo = [...this.state.groupUserData, userData];
            //setting up this array to use when creating the group, we will add an array of user id's to the groups table.
            // const userIDs = [...this.state.userIDs, response.data.userID];
            this.setState({
              userName: "",
              error: "",
              groupUserData: usersInfo
            });
          } else {
            this.setState({
              invalidUsernameError: "Please enter a valid username"
            });
          }
        });
    } else {
      this.setState({ invalidUsernameError: "Please enter a username" });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const groupUserData = this.state.groupUserData.map(user => {
      return user.userID;
    });

    const groupInfo = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      users: groupUserData
    };
    axios
      .post("/api/createGroup", groupInfo)
      .then(response => {
        const groupID = response.data;
        Promise.all(
          this.state.groupUserData.map(user => {
            //creating an updated version of the users groups and including the brand new group
            const updatedGroups = [...user.groups, groupID];
            //adding the updated groups array to each individual user
            const info = { groups: updatedGroups, userID: user.userID };
            return axios.put("/api/addGroupToUser", info);
          })
        ).then(response => {
          console.log(response);
          this.props.addGroup(groupID);
          this.props.history.push(`/group/${groupID}`);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteUser = userID => {
    const filteredGroupData = this.state.groupUserData.filter(user => {
      console.log(user);
      if (user.userID !== userID) {
        return user;
      } else return null;
    });
    this.setState({ groupUserData: filteredGroupData });
  };

  render() {
    const users = this.state.groupUserData.map((user, index) => {
      if (user.userID !== this.props.userID) {
        return (
          <div key={index}>
            <h6>{user.userName}</h6>
            <button
              onClick={() => this.deleteUser(user.userID)}
              className="deleteButton"
            >
              X
            </button>
          </div>
        );
      } else return null;
    });

    return (
      <div>
        <Navbar history={this.props.history} />
        <form onSubmit={this.handleSubmit}>
          <h6>Group Name</h6>
          <input
            type="text"
            value={this.state.groupName}
            onChange={this.onChangeGroupName}
          />
          <h6>Username</h6>
          <p>{this.state.invalidUsernameError}</p>
          <input
            type="text"
            value={this.state.userName}
            onChange={this.onChangeUserName}
          />
          <button
            type="button"
            className="addUserButton"
            onClick={this.checkUserNameValidity}
          >
            +
          </button>
          <button type="submit">Submit</button>
        </form>
        <br />

        <h6>{users}</h6>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addGroup: groupID => {
    return dispatch(addGroup(groupID));
  }
});

const mapStateToProps = state => ({
  userName: state.auth.userName,
  userID: state.auth.userID,
  userGroups: state.groups
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
