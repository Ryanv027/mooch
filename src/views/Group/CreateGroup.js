import React from "react";
import { connect } from "react-redux";
import Navbar from "./../Navbar/Navbar";
import axios from "axios";
import { addGroup } from "./../../actions/groups";
import "./CreateGroup.css";

class CreateGroup extends React.Component {
  state = {
    groupName: "",
    groupType: "",
    groupDescription: "",
    userName: "",
    groupUserData: [],
    invalidUsernameError: "",
    error: ""
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

  onChangeDescription = e => {
    const groupDescription = e.target.value;
    this.setState({ groupDescription });
  };

  checkUserNameValidity = () => {
    const userName = this.state.userName.toLowerCase();

    if (userName.length > 0) {
      axios
        .get(`/api/userNameValidity`, { params: { userName: userName } })
        .then(response => {
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
    if (
      this.state.groupName.length > 0 &&
      this.state.groupDescription.length > 0
    ) {
      const groupUserData = this.state.groupUserData.map(user => {
        return user.userID;
      });

      const groupInfo = {
        groupName: this.state.groupName,
        groupType: this.state.groupType,
        users: groupUserData,
        groupDescription: this.state.groupDescription
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
            this.props.addGroup(groupID);
            this.props.history.push(`/group/${groupID}`);
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ error: "All fields must be entered!" });
    }
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
          <div key={index} className="row">
            <h4 className="col s9 createGroup-username">{user.userName}</h4>
            <button
              onClick={() => this.deleteUser(user.userID)}
              className="deleteButton col s3"
            >
              -
            </button>
          </div>
        );
      } else return null;
    });

    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="section">
          <div className="container">
            <center>
              <div className="z-depth-5 grey lighten-4 row prime createGroup-background">
                <div className="row">
                  <h1 className="createGroup-title">Create Group</h1>
                  <h4 className="col s10 offset-s1">{this.state.error}</h4>
                  <form onSubmit={this.handleSubmit} id="createGroup">
                    <h6 className="font-medium">Group Name</h6>
                    <input
                      type="text"
                      value={this.state.groupName}
                      onChange={this.onChangeGroupName}
                    />
                    <h6 className="font-medium">Add Your Mooches</h6>
                    <p>{this.state.invalidUsernameError}</p>
                    <input
                      type="text"
                      value={this.state.userName}
                      onChange={this.onChangeUserName}
                    />
                    <div className="row center">
                      <button
                        type="button"
                        className="col s2 offset-s5 btn btn-large login-button addUser-button"
                        onClick={this.checkUserNameValidity}
                      >
                        +
                      </button>
                    </div>
                    <h6 className="font-medium">Group Description</h6>
                    <textarea
                      onChange={this.onChangeDescription}
                      value={this.state.groupDescription}
                    />

                    <button
                      type="submit"
                      className="col s12 btn btn-large waves-effect waves-light green-accent-2 login-button"
                    >
                      Create Group
                    </button>
                  </form>
                  <br />
                  <h2 className="underline">Users</h2>
                  <h4>{users}</h4>
                </div>
              </div>
            </center>
          </div>
        </div>
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
