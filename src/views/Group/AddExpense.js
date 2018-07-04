import React from "react";
import Navbar from "./../Navbar/Navbar";

class AddExpense extends React.Component {
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <button onClick={this.props.groupDashboardView}>GroupDashboard</button>
      </div>
    );
  }
}

export default AddExpense;
