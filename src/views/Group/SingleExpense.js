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
    console.log(this.props.expense);
    if (this.props.userID === this.props.expense.shark) {
      axios
        .delete("/api/deleteExpense", {
          params: {
            id: this.props.expense.expenseID,
            description: this.props.expense.description,
            groupID: this.props.expense.groupID,
            mooches: this.props.expense.mooches,
            moochesPaid: this.props.expense.moochesPaid,
            amount: this.props.expense.amount,
            shark: this.props.expense.shark
          }
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

    const style = {
      paddingBottom: "10px"
    };
    const buttonStyle = {
      padding: "8px"
    };
    return (
      <div className="col s4 offset-s4 singleExpense-container" style={style}>
        <div className="row">
          <div className="col s12 center-align">{this.state.error}</div>
          <h6 className="col s4 offset-s4 center-align singleExpense-title">
            {this.props.expense.description}
          </h6>
          <button
            onClick={this.deleteExpense}
            className="col s1 offset-s3 singleExpense-delete"
          >
            -
          </button>
          <p className="col s4 offset-s4 center-align singleExpense-amount">
            Amount: ${amount}
          </p>
          <p className="col s4 offset-s4 center-align singleExpense-mooches">
            Mooches:
          </p>
          <p className="col s4 offset-s4 center-align singleExpense-moochesList">
            {mooches}
          </p>
          <p className="col s4 offset-s4 center-align">
            Created By: {userName}
          </p>
          <button
            onClick={this.editExpense}
            className="col s6 offset-s3 singleExpense-button"
            style={buttonStyle}
          >
            Expense Overview
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default connect(mapStateToProps)(SingleExpense);
