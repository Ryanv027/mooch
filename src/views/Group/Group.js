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
    this.addGroupToUser();
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
        if (response.data.users !== undefined) {
          this.setUsersData(response.data.users);
        }
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
      const users = response.map(user => {
        return {
          userID: user.data.userID,
          userName: user.data.userName,
          email: user.data.email,
          checked: true,
          debt: 0
        };
      });
      this.setState({ users });
      this.getGroupExpenses();
    });
  };

  getGroupExpenses = () => {
    axios
      .get("/api/groupExpenses", {
        params: { groupID: this.state.groupID }
      })
      .then(response => {
        this.setDebt(response);
      });
  };

  setDebt = expenses => {
    console.log("EXPENSES- ", expenses);
    const users = this.state.users;
    console.log(users.length);
    for (let i = 0; i < users.length; i++) {
      console.log(expenses[i]);
      // for (let i = 0; i < expenses.length; i++) {
      //   console.log("Shark - ", expenses[i].shark);
      //   console.log("UserID - ", users[i].userID);
      // }
    }
  };

  addGroupToUser = () => {
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
