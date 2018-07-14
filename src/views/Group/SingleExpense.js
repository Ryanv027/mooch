import React from "react";

class SingleExpense extends React.Component {
  componentDidMount = () => {
    // setTimeout(() => {
    //   this.calculateSharkCredit();
    // }, 500);
  };

  // calculateSharkCredit = () => {
  //   console.log(this.props.groupUserData);
  //   const groupUserData = this.props.groupUserData.map(user => {
  //     if (user.userID === this.props.expense.shark) {
  //       const amount = this.props.expense.amount;
  //       const updatedUser = { ...user, balance: amount };
  //       return updatedUser;
  //     } else return user;
  //   });
  //   this.calculateMoochDebt(groupUserData);
  // };

  // calculateMoochDebt = groupUserData => {
  //   const amount =
  //     -this.props.expense.amount / this.props.expense.mooches.length;

  //   const newGroupUserData = groupUserData;

  //   groupUserData.map((user, index) => {
  //     return this.props.expense.mooches.forEach(mooch => {
  //       if (user.userID === mooch) {
  //         const updatedUser = { ...user, balance: amount };
  //         newGroupUserData[index] = updatedUser;
  //         return true;
  //       } else return null;
  //     });
  //   });

  //   this.props.calculateGroupDebts(newGroupUserData);
  // };

  render() {
    return (
      <div>
        <h5>{this.props.expense.description}</h5>
        <p>{this.props.expense.amount}</p>
      </div>
    );
  }
}

export default SingleExpense;
