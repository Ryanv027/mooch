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
    const buttonStyle = {
      marginTop: "0px",
      color: "white",
      padding: "5px"
    };
    return this.state.groupUserData.map(user => {
      let mooch = "";
      for (let i = 0; i < this.state.mooches.length; i++) {
        if (user.userID === this.state.mooches[i]) {
          mooch = user.userName;
        }
      }
      if (mooch.length > 0) {
        return (
          <div className="row">
            <h6 className="col s3 offset-s4 moochList">
              {mooch} owes {shark} -{" "}
              {(
                this.state.amount /
                100 /
                (this.state.mooches.length + this.state.moochesPaid.length + 1)
              ).toFixed(2)}
            </h6>
            <button
              onClick={() => this.payButton(user.userID)}
              className="col s1 paid-button"
              style={buttonStyle}
            >
              Paid
            </button>
          </div>
        );
      } else return null;
    });
  };

  findMoochesPaid = shark => {
    const buttonStyle = {
      marginTop: "0px",
      color: "white",
      padding: "5px"
    };

    const dash = {
      marginTop: "-12px"
    };

    return this.state.groupUserData.map(user => {
      let paidMooch = "";
      for (let i = 0; i < this.state.moochesPaid.length; i++) {
        if (user.userID === this.state.moochesPaid[i]) {
          paidMooch = user.userName;
        }
      }
      if (paidMooch.length > 0) {
        return (
          <div className="row">
            <h6 className="col s3 offset-s4 moochList paidMooch">
              {paidMooch} owes {shark} -{" "}
              {(
                this.state.amount /
                100 /
                (this.state.mooches.length + this.state.moochesPaid.length + 1)
              ).toFixed(2)}
            </h6>
            <button
              disabled={true}
              className="col s1 paid-button__disabled"
              style={buttonStyle}
            >
              Paid
            </button>
            <h3 className="col s1 center-align" style={dash}>
              {" "}
              -{" "}
            </h3>
            <button
              onClick={() => this.undoPayment(user.userID)}
              className="col s2 undoPayment-button"
              style={buttonStyle}
            >
              Undo Payment
            </button>
          </div>
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
        <div className="container debtOverview-container">
          <div className="groupDash-background">
            <div className="row groupDash-name__row">
              <h1 className="addExpense-header col s10 offset-s1 center-align">
                Expense Overview
              </h1>
            </div>
            <div className="row">
              <button
                onClick={this.goBack}
                className="col s4 offset-s4 btn btn-large login-button expenserOverview-button"
              >
                Back to Group Dashboard
              </button>
              <br />
              <h3 className="col s4 offset-s4 center-align">
                {this.state.description}
              </h3>
              <h5 className="col s4 offset-s4 center-align">
                Amount: $ {(this.state.amount / 100).toFixed(2)}
              </h5>
              <h4 className="col s4 offset-s4 center-align">
                <span className="mooches">Mooches</span>
              </h4>

              {mooches}
              {moochesPaid}

              <h5 className="col s4 offset-s4 center-align">
                Created By: {shark}
              </h5>
              {this.state.paymentError}
              {this.state.undoPaymentError}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedUser: state.auth.userID
});

export default connect(mapStateToProps)(ExpenseOverview);
