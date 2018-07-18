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
        <li>
          <p>{user.userName}</p>
          <p>{user.balance}</p>
        </li>
      );
    });
    console.log(this.props);
    return (
      <div>
        <h1>DEBT OVERVIEW</h1>
        <button
          className="col s12 btn btn-large waves-effect waves-light green-accent-2"
          onClick={this.props.groupDashboardView}
        >
          Back To Group Dashboard
        </button>
        <ul>{users}</ul>
      </div>
    );
  }
}

export default DebtOverview;
