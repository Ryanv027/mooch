import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "./../Navbar/Navbar";
import { addGroup } from "./../../actions/groups";
import Footer from "./../components/Footer";

import videoMP4 from "./../../videos/Breezy.mp4";
import videoWEBM from "./../../videos/Breezy.webm";

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
              invalidUsernameError: "*You cannot enter your own username!"
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
              invalidUsernameError: "",
              groupUserData: usersInfo
            });
          } else {
            this.setState({
              invalidUsernameError: "*Please enter a valid username"
            });
          }
        });
    } else {
      this.setState({ invalidUsernameError: "*Please enter a valid username" });
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
      this.setState({ error: "*All fields must be entered!" });
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
          <div key={index}>
            <div className="col s6 offset-s1">
              <p className="user-box-username">{user.userName}</p>
            </div>
            <div className="col s4">
              <div
                className="delete-button center"
                onClick={() => this.deleteUser(user.userID)}
              >
                <span className="delete-button__x">X</span>
              </div>
            </div>
          </div>
        );
      } else return null;
    });

    const font = {
      fontSize: "1.8rem"
    };
    return (
      <div className="page-container">
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div className="create-group-container">
            <div className="row">
              <div className="col l6 s12 offset-l1">
                <div className="create-group-background">
                  <div className="row">
                    <div className="col s10 l10 offset-s1 offset-l1">
                      <h1 className="page-heading">Create Group</h1>
                    </div>
                    <div className="col s10 offset-s1 center">
                      <p className="error">{this.state.error}</p>
                    </div>
                    <div className="col s10 offset-s1">
                      <h6 className="page-heading-secondary">Group Name</h6>
                      <input
                        type="text"
                        value={this.state.groupName}
                        onChange={this.onChangeGroupName}
                      />
                    </div>
                    <div className="col s10 offset-s1">
                      <p className="center error margin-top">
                        {this.state.invalidUsernameError}
                      </p>
                      <h6 className="page-heading-secondary">
                        Add Your Mooches
                        <br />
                        <span className="mooch-message">(by username)</span>
                      </h6>
                      <input
                        type="text"
                        value={this.state.userName}
                        onChange={this.onChangeUserName}
                      />
                    </div>
                    <div className="col s2 offset-s5">
                      <div
                        className="add-user-button"
                        onClick={this.checkUserNameValidity}
                      >
                        <span className="add-user-button__plus">+</span>
                      </div>
                    </div>
                    <div className="col s10 offset-s1">
                      <h6 className="page-heading-secondary">
                        Group Description
                      </h6>
                      <textarea
                        style={font}
                        onChange={this.onChangeDescription}
                        value={this.state.groupDescription}
                      />
                    </div>
                    <div className="col s10 l4 offset-s1 offset-l4 center">
                      <button
                        className="main-button"
                        onClick={this.handleSubmit}
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col l2 s10 offset-l1 offset-s1 users-box">
                <div className="create-group-background">
                  <div className="row">
                    <div className="col s10 offset-s1">
                      <h1 className="page-heading center">Users</h1>
                    </div>
                    {users}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
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
