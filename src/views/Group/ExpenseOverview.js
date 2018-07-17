import React from "react";
import axios from "axios";

import Navbar from "./../Navbar/Navbar";

class ExpenseOverview extends React.Component {
  state = {
    expense: "",
    mooches: [],
    shark: "",
    description: "",
    moochesPaid: [],
    groupUserData: []
  };
  componentDidMount = () => {
    this.getExpenseData();
  };

  getExpenseData = () => {
    const expenseID = this.props.match.params.id;
    axios
      .get("/api/singleExpenseData", { params: { expenseID: expenseID } })
      .then(response => {
        console.log(response);
        this.setGroupData(response.data.groupID);
        this.setState({
          mooches: response.data.mooches,
          shark: response.data.shark,
          amount: response.data.amount,
          description: response.data.description
        });
      });
  };

  setGroupData = groupID => {
    axios
      .get("/api/groupData", {
        params: { groupID: groupID }
      })
      .then(response => {
        this.setState({
          groupName: response.data.groupName,
          groupID: response.data.groupID
        });
        if (response.data.users !== undefined) {
          this.setGroupUserData(response.data.users);
        }
      });
  };

  setGroupUserData = users => {
    Promise.all(
      users.map(user => {
        return axios.get(`/api/groupUsers/${user}`);
      })
    ).then(response => {
      const users = response.map(user => {
        return {
          userID: user.data.userID,
          userName: user.data.userName,
          email: user.data.email,
          checked: true,
          balance: 0
        };
      });
      this.setState({ groupUserData: users });
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        <button onClick={this.goBack}>Go Back</button>
      </div>
    );
  }
}

export default ExpenseOverview;
