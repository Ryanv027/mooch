import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class AddExpense extends React.Component {
  state = {
    groupUserData: [],
    groupID: "",
    userID: "",
    description: "",
    amount: 0,
    error: ""
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
    if (this.state.amount > 0 && this.state.description.length > 0) {
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
        amount: parseFloat(this.state.amount) * 100
      };
      console.log(info.amount);
      axios
        .post("/api/createExpense", info)
        .then(response => {
          console.log(response);
          if (response.data.length > 0) {
            this.props.groupDashboardView();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ error: "All fields must be filled out" });
    }
  };

  onChangeDescription = e => {
    const description = e.target.value;
    this.setState({ description });
  };

  onChangeAmount = e => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
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
            <label htmlFor={user.userName} className="col s8 offset-s3">
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

    const buttonStyle = {
      padding: "15px",
      color: "white",
      marginBottom: "10px"
    };

    return (
      <div className="container singleExpense-container">
        <div className="groupDash-background">
          <div className="row groupDash-name__row">
            <h1 className="col s6 offset-s3 center-align addExpense-header">
              Add Expense
            </h1>
          </div>
          <div className="row">
            <h4 className="col s10 offset-s1 center-align">
              {this.state.error}
            </h4>
            <button
              className="col s4 offset-s4 btn btn-large login-button"
              onClick={this.props.groupDashboardView}
            >
              Back To Group Dashboard
            </button>
          </div>
          <div className="row">
            <form onSubmit={this.expenseSubmit}>
              <h6 className="col s4 offset-s4 center-align">Description</h6>
              <input
                type="text"
                value={this.state.description}
                onChange={this.onChangeDescription}
                className="col s8 offset-s2"
              />
              <h6 className="col s4 offset-s4 center-align">Amount</h6>
              <input
                type="number"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                className="col s8 offset-s2"
              />
              <h6 className="col s8 offset-s2 center-align addExpense-uncheck">
                (Uncheck users that you would like to exclude from this expense)
              </h6>
              {userCheckboxes}
              <div className="spacing col s12" />
              <button
                className="col s2 offset-s5 login-button"
                style={buttonStyle}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default connect(mapStateToProps)(AddExpense);
