import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class SingleExpense extends React.Component {
  state = {
    error: ""
  };

  editExpense = () => {
    this.props.history.push(`/expense/${this.props.expense.expenseID}`);
  };

  deleteExpense = () => {
    if (this.props.userID === this.props.expense.shark) {
      axios
        .delete("/api/deleteExpense", {
          params: { id: this.props.expense.expenseID }
        })
        .then(response => {
          if (response.data === "confirm") {
            this.setState({ error: "" });
            this.props.getGroupExpenses();
          }
        });
    } else {
      this.setState({
        error: "Only original creator can delete this expense!"
      });
    }
  };

  render() {
    const userName = this.props.groupUserData.map(user => {
      if (user.userID === this.props.expense.shark) {
        return user.userName;
      }
    });

    const mooches = this.props.groupUserData.map(user => {
      let userName = "";
      for (let i = 0; i < this.props.expense.mooches.length; i++) {
        if (user.userID === this.props.expense.mooches[i]) {
          userName = user.userName;
        }
      }
      return `${userName} `;
    });
    const amount = (this.props.expense.amount / 100).toFixed(2);
    return (
      <div>
        {this.state.error}
        <h6>Expense: {this.props.expense.description}</h6>
        <p>Created By: {userName}</p>
        <p>Amount: {amount}</p>
        <p>Mooches: {mooches}</p>
        <button onClick={this.deleteExpense}>delete expense</button>
        <button onClick={this.editExpense}>EDIT MEH</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default connect(mapStateToProps)(SingleExpense);
