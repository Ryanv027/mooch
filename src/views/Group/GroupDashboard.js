import React from "react";

class GroupDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.groupName}</h1>
        <button onClick={this.props.addExpenseView}>Add Expense</button>
        <button onClick={this.props.debtOverview}>Debt Overview</button>
        <h1>Users</h1>
      </div>
    );
  }
}

export default GroupDashboard;
