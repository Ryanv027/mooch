import React from "react";

class DebtOverview extends React.Component {
  getCreditUsers = () => {
    const credits = this.props.groupUserData.filter(user => {
      return user.balance > 0;
    });
    return credits;
  };

  getDebitUsers = () => {
    const debits = this.props.groupUserData.filter(user => {
      return user.balance < 0;
    });
    return debits;
  };

  calculateSomeShit = (credits, debits) => {
    const list = credits.map(user => {
      const balance = user.balance;
      let updatingBalance = 0;
      for (let i = 0; i < debits.length; i++) {
        if (debits[i].balance < balance) {
        }
      }
    });
  };

  render() {
    const credits = this.getCreditUsers();
    const debits = this.getDebitUsers();
    console.log(credits);
    console.log(debits);

    const calculateSomeShit = this.calculateSomeShit(credits, debits);

    const users = this.props.groupUserData.map(user => {
      return (
        <div className="row">
          <h4 className="col s2 offset-s4">{user.userName}</h4>
          {user.balance >= 0 ? (
            <h4 className="col s3">$ {user.balance}</h4>
          ) : (
            <h4 className="col s3">
              $ <span className="debtOverview-negative">{user.balance}</span>
            </h4>
          )}
        </div>
      );
    });
    console.log(this.props);
    return (
      <div className="container debtOverview-container">
        <div className="groupDash-background">
          <div className="row groupDash-name__row">
            <h1 className="col s10 offset-s1 center-align addExpense-header">
              Debt Overview
            </h1>
          </div>
          <div className="row">
            <button
              className="col s4 offset-s4 btn btn-large login-button"
              onClick={this.props.groupDashboardView}
            >
              Back To Group Dashboard
            </button>
          </div>
          {users}
          <div className="row">
            <div className="spacing col s12" />
          </div>
        </div>
      </div>
    );
  }
}

export default DebtOverview;
