import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import checkMark from "./../../images/Check_mark.png";

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
      // console.log(info.amount);
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
      this.setState({ error: "*All fields must be filled out" });
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
    const usernameStyle = {
      fontSize: "1.8rem",
      color: "black"
    };

    const userCheckboxes = this.state.groupUserData.map((user, index) => {
      if (user.userID !== this.props.userID) {
        return (
          <div key={index}>
            <div className="col s8 offset-s3 mb-medium checkbox">
              <input
                type="checkbox"
                id={user.userName}
                name={user.userName}
                className="filled-in checkbox__button"
                checked={user.checked}
                onChange={() => this.checkboxToggle(user.userID)}
              />
              <label htmlFor={user.userName} className="checkbox__label">
                <span className="checkbox__span" />
                <span style={usernameStyle}>{user.userName}</span>
              </label>
              <img
                src={checkMark}
                alt="check mark"
                className="checkbox__image"
              />
            </div>
          </div>
        );
      } else return null;
    });

    return (
      <div className="group-container">
        <div className="row">
          <div className="col s12">
            <div className="create-group-background">
              <div className="add-expense__header">
                <div className="add-expense__header-left">
                  <button
                    className="back-button"
                    onClick={this.props.groupDashboardView}
                  >
                    &larr; Back
                  </button>
                </div>
                <h1 className="page-heading add-expense__header-center">
                  Add Expense
                </h1>
                <div className="add-expense__header-right">&nbsp;</div>
              </div>

              <div className="col s10 offset-s1 center">
                <p className="error">{this.state.error}</p>
              </div>

              <div className="row">
                <div className="col s8 offset-s2 center input-field">
                  <h6 className="page-heading-secondary">Description</h6>
                  <input
                    type="text"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>
                <div className="col s8 offset-s2 center input-field">
                  <h6 className="page-heading-secondary">Amount</h6>
                  <input
                    type="number"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                  />
                </div>
                <div className="col s8 offset-s2 center">
                  <h6 className="user-checkbox__heading">
                    (Uncheck users that you would like to exclude from this
                    expense)
                  </h6>
                </div>
                {userCheckboxes}
                <div className="col s8 offset-s2 center mt-medium">
                  <button className="main-button " onClick={this.expenseSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
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
