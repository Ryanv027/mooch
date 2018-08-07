import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import userPhoto from "./../../images/61205.svg";
import checkMark from "./../../images/Check_mark.png";

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
        error: "*Only original creator can delete this expense!"
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
      if (userName.length > 0) {
        return (
          <div className="mooch">
            {" "}
            <span>
              <img src={userPhoto} alt="photo" className="mooch__photo" />
            </span>
            {userName}{" "}
          </div>
        );
      } else return null;
    });

    const moochCheck = mooches.filter(mooch => {
      if (mooch !== null) {
        return mooch;
      } else return null;
    });

    console.log(moochCheck.length);

    const amount = (this.props.expense.amount / 100).toFixed(2);

    return (
      <div className="single-expense">
        <div className="row">
          <div className="col s12 center">
            <h6 className="single-expense__title">
              {this.props.expense.description}
            </h6>
          </div>

          <div className="col s12 center">
            <div className="h6 error single-expense__error">
              {this.state.error}
            </div>
          </div>

          <button
            onClick={this.deleteExpense}
            className="single-expense__button"
          >
            -
          </button>

          <div className="col s5  center mt-small">
            <h6 className="single-expense__description">
              <span className="bold">Amount:</span>{" "}
              <span className="color-green">$</span>
              {amount}
            </h6>
          </div>

          <div className="col s6 offset-s1 center mt-small">
            <h6 className="single-expense__description">
              <span className="bold">Created By:</span> {userName}
            </h6>
          </div>

          <div className="col s10 offset-s1 center mt-medium">
            <h6 className="single-expense__description">
              <span className="bold">Mooches:</span>
            </h6>
          </div>
          {moochCheck.length > 0 ? (
            <div className="col s10 offset-s1">
              <div className="mooch-container">{mooches}</div>
            </div>
          ) : (
            <div>
              <div className="col s10 offset-s1 mt-medium center">
                <h6>All mooches have paid up!</h6>
              </div>
              <div className="col s10 offset-s1 mt-medium center">
                <img src={checkMark} alt="check mark" className="check-image" />
              </div>
            </div>
          )}

          <div className="col s10 offset-s1 center">
            <button onClick={this.editExpense} className="secondary-button">
              Expense Overview
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default connect(mapStateToProps)(SingleExpense);
