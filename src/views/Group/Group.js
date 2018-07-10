import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "../Navbar/Navbar";
import AddExpense from "./AddExpense";
import GroupDashboard from "./GroupDashboard";
import DebtOverview from "./DebtOverview";

class Group extends Component {
  state = {
    groupName: "",
    groupID: "",
    users: [],
    groupDashboard: true,
    addExpenseView: false,
    debtOverview: false
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

  groupDashboardView = () => {
    this.setState({
      groupDashboard: true,
      addExpenseView: false,
      debtOverview: false
    });
  };

  addExpenseView = () => {
    this.setState({
      groupDashboard: false,
      addExpenseView: true,
      debtOverview: false
    });
  };

  debtOverview = () => {
    this.setState({
      groupDashboard: false,
      addExpenseView: false,
      debtOverview: true
    });
  };

  setUsersData = users => {
    Promise.all(
      users.map(user => {
        return axios.get(`/api/groupUsers/${user}`);
      })
    ).then(response => {
      console.log(response);
      const users = response.filter(user => {
        if (user.data.userID !== this.props.id) {
          return user;
        }
      });

      const usersWithoutLoggedInUser = users.map(user => {
        return {
          userID: user.data.userID,
          userName: user.data.userName,
          email: user.data.email,
          checked: true
        };
      });

      this.setState({ users: usersWithoutLoggedInUser });
    });
  };

  addGroupsToDatabase = () => {
    const info = { groups: this.props.groups, userID: this.props.id };
    axios.put("/api/addGroupToUser", info);
  };

  render = () => {
    return (
      <div>
        <Navbar history={this.props.history} />
        {this.state.groupDashboard ? (
          <GroupDashboard
            addExpenseView={this.addExpenseView}
            debtOverview={this.debtOverview}
            groupName={this.state.groupName}
            users={this.state.users}
          />
        ) : null}
        {this.state.addExpenseView ? (
          <AddExpense
            groupDashboardView={this.groupDashboardView}
            users={this.state.users}
            groupID={this.state.groupID}
            userID={this.props.id}
          />
        ) : null}
        {this.state.debtOverview ? (
          <DebtOverview groupDashboardView={this.groupDashboardView} />
        ) : null}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups,
  id: state.auth.userID
});

export default connect(mapStateToProps)(Group);