import React from "react";

class GroupDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>GroupDashboard</h1>
        <button onClick={this.props.addExpenseView}>Add Expense</button>
        <button onClick={this.props.debtOverview}>Debt Overview</button>
      </div>
    );
  }
}

export default GroupDashboard;
