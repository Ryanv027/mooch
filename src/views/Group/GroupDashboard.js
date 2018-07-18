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

    return (
      <div className="container groupExpense-container">
        <div className="section groupDash-background">
          <div className="row groupDash-name__row">
            <h1 className="col s8 offset-s2 center-align groupDash-name">
              Group - {this.props.groupName}
            </h1>
          </div>

          <div className="divider" />

          <div className="row">
            <button
              className="col s3 offset-s2 btn btn-large waves-effect waves-light green-accent-2 login-button"
              onClick={this.props.addExpenseView}
            >
              Add Expense
            </button>
            <button
              className="col s3 offset-s2 btn btn-large waves-effect waves-light green-accent-2 login-button "
              onClick={this.props.debtOverview}
            >
              Debt Overview
            </button>
          </div>
          {expenses.length > 0 ? (
            <div className="row">
              <h4 className="col s4 offset-s4 center-align groupDash-expense">
                Group Expenses
              </h4>
              {expenses}
            </div>
          ) : (
            <div className="row">
              <h1 className="font-medium col s10 offset-s1 center-align">
                No expenses found! Add one to get started!
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GroupDashboard;
