import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class AddExpense extends React.Component {
  state = {
    groupUserData: [],
    groupID: "",
    userID: "",
    description: "",
    amount: 0
  };

  componentWillMount = () => {
    this.setState({
      groupUserData: this.props.groupUserData,
      groupID: this.props.groupID,
      userID: this.props.userID
    });
  };

  expenseSubmit = e => {
    e.preventDefault();
    const filteredUserIDs = [];
    this.state.groupUserData.filter(user => {
      if (user.checked === true && user.userID !== this.state.userID) {
        filteredUserIDs.push(user.userID);
        return true;
      } else return null;
    });
    const info = {
      groupID: this.state.groupID,
      users: filteredUserIDs,
      userID: this.state.userID,
      description: this.state.description,
      amount: this.state.amount
    };
    axios
      .post("/api/addExpense", info)
      .then(response => {
        console.log(response);
        if (response.data === "confirm") {
          this.props.groupDashboardView();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChangeDescription = e => {
    const description = e.target.value;
    this.setState({ description });
  };

  onChangeAmount = e => {
    const amount = e.target.value;
    this.setState({ amount });
  };

  checkboxToggle = userID => {
    const users = this.state.groupUserData;

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
    const userCheckboxes = this.state.groupUserData.map((user, index) => {
      if (user.userID !== this.props.userID) {
        return (
          <p key={index}>
            <label htmlFor={user.userName}>
              <input
                type="checkbox"
                id={user.userName}
                className="filled-in"
                checked={user.checked}
                onChange={() => this.checkboxToggle(user.userID)}
              />
              <span>{user.userName}</span>
            </label>
          </p>
        );
      } else return null;
    });

    return (
      <div>
        <h1>Add Expense</h1>
        <button className="col s12 btn btn-large waves-effect waves-light green-accent-2" onClick={this.props.groupDashboardView}>Back To Group Dashboard</button>

        <form onSubmit={this.expenseSubmit}>
          <h6>Description</h6>
          <input
            type="text"
            value={this.state.description}
            onChange={this.onChangeDescription}
          />
          <h6>Amount</h6>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.onChangeAmount}
          />
          {userCheckboxes}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default connect(mapStateToProps)(AddExpense);
