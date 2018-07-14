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
    this.props.groupUserData.map(user => {
      this.getUserBalance(user.userID, expenses);
    });
  };

  getUserBalance = (userID, expenses) => {
    console.log(userID, "AND", expenses);
    const credits = this.getMyCredits(userID, expenses);
    const debits = this.getMyDebits(userID, expenses);
    console.log(credits);
    console.log(debits);
  };

  getMyDebits = (userID, expenses) => {
    return expenses
      .filter(expense => expense.mooches.includes(userID))
      .reduce(
        (acc, cv) => acc + parseInt(cv.amount, 10) / (cv.mooches.length + 1),
        0
      );
  };

  getMyCredits = (userID, expenses) => {
    return expenses
      .filter(expense => expense.shark === userID)
      .reduce(
        (acc, cv) => acc + parseInt(cv.amount, 10) / (cv.mooches.length + 1),
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
        />
      );
    });

    return (
      <div>
        <h1>{this.props.groupName}</h1>
        <button
          className="col s6 btn btn-large waves-effect waves-light green-accent-2"
          onClick={this.props.addExpenseView}
        >
          Add Expense
        </button>
        <button
          className="col s6 btn btn-large waves-effect waves-light green-accent-2"
          onClick={this.props.debtOverview}
        >
          Debt Overview
        </button>
        <h4>Expenses</h4>
        {expenses}
      </div>
    );
  }
}

export default GroupDashboard;
