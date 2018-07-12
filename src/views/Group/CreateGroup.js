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
    userName: "",
    userIDs: [],
    usersInfo: [],
    error: ""
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

  handleAddUser = () => {
    const user = this.state.userName;

    if (user.length > 0) {
      axios.get(`/api/user/${user}`).then(response => {
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

  handleSubmit = e => {
    e.preventDefault();
    const groupInfo = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      users: [...this.state.userIDs, this.props.userInfo.userID]
    };
    axios
      .post("/api/createGroup", groupInfo)
      .then(response => {
        const group = response.data;
        Promise.all(
          this.state.usersInfo.map(user => {
            //creating an updated version of the users groups and including the brand new group
            const updatedGroups = [...user.groups, group];
            //adding the updated groups array to each individual user
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
      } else return null;
    });
    const filteredUserIDs = this.state.userIDs.filter(user => {
      if (user !== userID) {
        return user;
      } else return null;
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
        <div className="section">
          <div className="container">
            <center>
              <div className="z-depth-5 grey lighten-4 row prime">
                <div className="row">
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
          <button
            type="submit"
            className="col s12 btn btn-large waves-effect waves-light green-accent-2">Submit</button>
        </form>
        <br />

        <h1>{users}</h1>
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
  userInfo: state.auth
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGroup);
