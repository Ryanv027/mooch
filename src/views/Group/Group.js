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
    groupUserData: [],
    groupDashboard: false,
    addExpenseView: false,
    debtOverview: false
  };

  componentDidMount = () => {
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
          this.setGroupUserData(response.data.users);
        }
      });
  };

  setGroupUserData = users => {
    Promise.all(
      users.map(user => {
        return axios.get(`/api/groupUsers/${user}`);
      })
    ).then(response => {
      const users = response.map(user => {
        return {
          userID: user.data.userID,
          userName: user.data.userName,
          email: user.data.email,
          checked: true,
          balance: 0
        };
      });
      this.setState({ groupUserData: users, groupDashboard: true });
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

  // calculateGroupDebts = newGroupUserData => {
  //   console.log("CALCULATE GROUP DEBTS", newGroupUserData);

  //   const final = this.state.groupUserData.map(user => {
  //     newGroupUserData.forEach(newUser => {
  //       if (user.userID === newUser.userID) {
  //         console.log("OLD", user.balance);
  //         console.log("NEW", newUser.balance);
  //         const newUserBalance =
  //           parseInt(user.balance, 10) + parseInt(newUser.balance, 10);
  //         const newUserComplete = { ...user, balance: newUserBalance };
  //         console.log(newUserComplete);
  //       }
  //     });
  //   });
  //   console.log(final);
  // };

  render = () => {
    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="section">
          <div className="container">
            <center>
              <div className="z-depth-5 grey lighten-4 row prime">
                <div className="row">
                  {this.state.groupDashboard ? (
                    <GroupDashboard
                      addExpenseView={this.addExpenseView}
                      debtOverview={this.debtOverview}
                      groupName={this.state.groupName}
                      groupUserData={this.state.groupUserData}
                      calculateGroupDebts={this.calculateGroupDebts}
                      match={this.props.match}
                    />
                  ) : null}
                  {this.state.addExpenseView ? (
                    <AddExpense
                      groupDashboardView={this.groupDashboardView}
                      groupUserData={this.state.groupUserData}
                      groupID={this.state.groupID}
                      userID={this.props.id}
                    />
                  ) : null}
                  {this.state.debtOverview ? (
                    <DebtOverview
                      groupDashboardView={this.groupDashboardView}
                      groupUserData={this.state.groupUserData}
                    />
                  ) : null}
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups,
  id: state.auth.userID
});

export default connect(mapStateToProps)(Group);
