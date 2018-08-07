import React from "react";
import axios from "axios";

import SingleExpense from "./SingleExpense";

class GroupDashboard extends React.Component {
  state = {
    expenses: []
  };

  componentDidMount = () => {
    console.log("component mounted dashboard");
    this.getGroupExpenses();
  };

  componentDidUpdate = () => {
    console.log("component did update");
  };

  getGroupExpenses = () => {
    axios
      .get("/api/groupExpenses", {
        params: { groupID: this.props.match.params.id }
      })
      .then(response => {
        this.setState({ expenses: response.data });
        this.calculateUserBalances(response.data);
      });
  };

  calculateUserBalances = expenses => {
    const newGroupUsers = this.props.groupUserData.map(user => {
      const balance = this.getUserBalance(user.userID, expenses);
      const newUser = { ...user, balance: balance };
      return newUser;
    });
    console.log(newGroupUsers);
    this.props.setGroupDebts(newGroupUsers);
  };

  getUserBalance = (userID, expenses) => {
    console.log(userID, "AND", expenses);
    const credits = this.getMyCredits(userID, expenses);
    const debits = this.getMyDebits(userID, expenses);
    const calculatedCredit = credits;
    const calculatedDebits = -debits;
    console.log("CREDITS", credits);
    console.log("DEBITS", debits);
    return ((calculatedDebits + calculatedCredit) / 100).toFixed(2);
  };

  getMyDebits = (userID, expenses) => {
    return expenses
      .filter(expense => expense.mooches.includes(userID))
      .reduce(
        (acc, cv) =>
          acc +
          parseInt(cv.amount, 10) /
            (cv.mooches.length + cv.moochesPaid.length + 1),
        0
      );
  };

  getMyCredits = (userID, expenses) => {
    return expenses
      .filter(expense => expense.shark === userID)
      .reduce(
        (acc, cv) =>
          acc +
          (parseInt(cv.amount, 10) /
            (cv.mooches.length + cv.moochesPaid.length + 1)) *
            cv.mooches.length,
        0
      );
  };

  render() {
    const expenses = this.state.expenses.map((expense, index) => {
      return (
        <SingleExpense
          key={index}
          expense={expense}
          groupUserData={this.props.groupUserData}
          calculateGroupDebts={this.props.calculateGroupDebts}
          history={this.props.history}
          getGroupExpenses={this.getGroupExpenses}
        />
      );
    });

    const buttonStyle = {
      margin: 0
    };

    console.log("DASHBOARD ", this.state.groupUserdata);
    return (
      <div className="group-container">
        <div className="row">
          <div className="col s12">
            <div className="create-group-background">
              <div className="row">
                <div className="col s8 offset-s2 center">
                  <h3 className="group-dashboard__group-name">
                    {this.props.groupName}
                  </h3>
                </div>

                <div className="col l3 s8 offset-s2 offset-l2 mb-large center">
                  <div
                    className="group-dashboard-button"
                    onClick={this.props.addExpenseView}
                  >
                    <h3 className="add-group-button-text">Add Expense</h3>
                  </div>
                </div>
                <div className="col l3 s8 offset-s2 offset-l2 mb-large center">
                  <div
                    className="group-dashboard-button"
                    onClick={this.props.debtOverview}
                  >
                    <h3 className="add-group-button-text">Overview</h3>
                  </div>
                </div>

                <div className="col s8 offset-s2 center">
                  <h4 className="expense-container__header mb-medium">
                    Expenses
                  </h4>
                </div>

                {expenses.length > 0 ? (
                  <div className="row">
                    <div className="col s8 offset-s2">
                      <div className="expense-container">{expenses}</div>
                    </div>
                  </div>
                ) : (
                  <div className="col s10 offset-s1 center">
                    <h1 className="page-heading-secondary no-expenses">
                      No expenses found! Add one to get started!
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDashboard;
