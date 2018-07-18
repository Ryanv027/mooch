import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Navbar from "./../Navbar/Navbar";

class ExpenseOverview extends React.Component {
  state = {
    expense: "",
    mooches: [],
    shark: "",
    amount: 0,
    description: "",
    moochesPaid: [],
    groupUserData: [],
    paymentError: "",
    undoPaymentError: ""
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
        const moochesPaid =
          response.data.moochesPaid === null ? [] : response.data.moochesPaid;
        this.setGroupData(response.data.groupID);
        this.setState({
          mooches: response.data.mooches,
          moochesPaid: moochesPaid,
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

  payButton = userID => {
    console.log(userID);
    if (this.props.loggedUser === this.state.shark) {
      const mooches = this.state.mooches.filter(mooch => {
        return mooch !== userID;
      });
      const moochesPaid = [...this.state.moochesPaid, userID];
      this.setState({
        mooches: mooches,
        moochesPaid: moochesPaid,
        paymentError: ""
      });

      const info = {
        mooches: mooches,
        moochesPaid: moochesPaid,
        expenseID: this.props.match.params.id
      };
      axios.put("/api/updateMooches", info).then(response => {
        console.log(response);
      });
    } else {
      this.setState({
        paymentError: "Only creator of this expense may confirm payment",
        undoPaymentError: ""
      });
    }
  };

  undoPayment = userID => {
    console.log(userID);
    if (this.props.loggedUser === this.state.shark) {
      const moochesPaid = this.state.moochesPaid.filter(mooch => {
        return mooch !== userID;
      });
      const mooches = [...this.state.mooches, userID];
      this.setState({
        mooches: mooches,
        moochesPaid: moochesPaid,
        undoPaymentError: ""
      });

      const info = {
        mooches: mooches,
        moochesPaid: moochesPaid,
        expenseID: this.props.match.params.id
      };
      axios.put("/api/updateMooches", info).then(response => {
        console.log(response);
      });
    } else {
      this.setState({
        undoPaymentError: "Only creator of this expense may undo a payment",
        paymentError: ""
      });
    }
  };

  findShark = () => {
    console.log("hit find shark");
    let shark = "";
    this.state.groupUserData.map(user => {
      if (user.userID === this.state.shark) {
        console.log(user.userName);
        shark = user.userName;
      }
    });
    return shark;
  };

  findMooches = shark => {
    return this.state.groupUserData.map(user => {
      let mooch = "";
      for (let i = 0; i < this.state.mooches.length; i++) {
        if (user.userID === this.state.mooches[i]) {
          mooch = user.userName;
        }
      }
      if (mooch.length > 0) {
        return (
          <li>
            {mooch} owes {shark} -{" "}
            {(
              this.state.amount /
              100 /
              (this.state.mooches.length + this.state.moochesPaid.length + 1)
            ).toFixed(2)}
            <button onClick={() => this.payButton(user.userID)}>Pay</button>
          </li>
        );
      } else return null;
    });
  };

  findMoochesPaid = shark => {
    return this.state.groupUserData.map(user => {
      let paidMooch = "";
      for (let i = 0; i < this.state.moochesPaid.length; i++) {
        if (user.userID === this.state.moochesPaid[i]) {
          paidMooch = user.userName;
        }
      }
      if (paidMooch.length > 0) {
        return (
          <li className="paidMooch">
            {paidMooch} owes {shark} -{" "}
            {(
              this.state.amount /
              100 /
              (this.state.mooches.length + this.state.moochesPaid.length + 1)
            ).toFixed(2)}
            <button disabled={true}>Paid</button>
            <button onClick={() => this.undoPayment(user.userID)}>
              Undo Payment
            </button>
          </li>
        );
      } else return null;
    });
  };

  render() {
    console.log("RENDER");
    const shark = this.findShark();

    const mooches = this.findMooches(shark);

    const moochesPaid = this.findMoochesPaid(shark);

    return (
      <div>
        <Navbar history={this.props.history} />
        <button onClick={this.goBack}>Go Back</button>
        <h1>EXPENSE OVERVIEW</h1>
        <h6>Expense: {this.state.description}</h6>
        <h6>Amount: {(this.state.amount / 100).toFixed(2)}</h6>
        <h6>Created By: {shark}</h6>
        {this.state.paymentError}
        {this.state.undoPaymentError}
        <h5>Mooches</h5>
        <ul>
          {mooches}
          {moochesPaid}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedUser: state.auth.userID
});

export default connect(mapStateToProps)(ExpenseOverview);
