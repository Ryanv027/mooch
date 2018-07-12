import React from "react";
import axios from "axios";

import SingleExpense from "./SingleExpense";

class GroupDashboard extends React.Component {
  state = {
    expenses: []
  };

  componentDidMount = () => {
    this.getGroupExpenses();
  };

  getGroupExpenses = () => {
    axios
      .get("/api/groupExpenses", {
        params: { groupID: this.props.match.params.id }
      })
      .then(response => {
        this.setState({ expenses: response.data });
      });
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
        <button onClick={this.props.addExpenseView}>Add Expense</button>
        <button onClick={this.props.debtOverview}>Debt Overview</button>
        <h4>Expenses</h4>
        {expenses}
      </div>
    );
  }
}

export default GroupDashboard;
