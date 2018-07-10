import React from "react";
import axios from "axios";

class AddExpense extends React.Component {
  state = {
    users: [],
    groupID: "",
    userID: "",
    description: "",
    amount: 0
  };

  componentWillMount = () => {
    this.setState({
      users: this.props.users,
      groupID: this.props.groupID,
      userID: this.props.userID
    });
  };

  handleExpenseSubmit = e => {
    e.preventDefault();
    const filteredUserIDs = [];
    // const filteredUsers = this.state.users.filter(user => {
    //   if (user.checked === true) {
    //     filteredUserIDs.push(user.userID);
    //   }
    // });
    console.log(filteredUserIDs);
    const info = {
      groupID: this.state.groupID,
      users: filteredUserIDs,
      userID: this.state.userID,
      description: this.state.description,
      amount: this.state.amount
    };
    axios.post("/api/addExpense", info);
  };

  handleDescriptionChange = e => {
    const description = e.target.value;
    this.setState({ description });
  };

  handleAmountChange = e => {
    const amount = e.target.value;
    this.setState({ amount });
  };

  handleCheck = userID => {
    console.log(userID);
    const users = this.state.users;
    const userIndex = users.findIndex(user => {
      return user.userID === userID;
    });
    const userObjectToUpdate = users[userIndex];
    if (userObjectToUpdate.checked === true) {
      const updatedUserObject = { ...userObjectToUpdate, checked: false };
      users[userIndex] = updatedUserObject;
    } else {
      const updatedUserObject = { ...userObjectToUpdate, checked: true };
      users[userIndex] = updatedUserObject;
    }
    this.setState({ users });
  };

  render() {
    const userCheckboxes = this.state.users.map((user, index) => {
      return (
        <p key={index}>
          <label htmlFor={user.userName}>
            <input
              type="checkbox"
              id={user.userName}
              className="filled-in"
              checked={user.checked}
              onChange={() => this.handleCheck(user.userID)}
            />
            <span>{user.userName}</span>
          </label>
        </p>
      );
    });
    //console.log(userCheckboxes);
    return (
      <div>
        <h1>Add Expense</h1>
        <button onClick={this.props.groupDashboardView}>GroupDashboard</button>

        <form onSubmit={this.handleExpenseSubmit}>
          <h6>Description</h6>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <h6>Amount</h6>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
          {userCheckboxes}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddExpense;
