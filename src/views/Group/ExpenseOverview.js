import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Navbar from "./../Navbar/Navbar";
import Footer from "./../components/Footer";

import videoMP4 from "./../../videos/Breezy.mp4";
import videoWEBM from "./../../videos/Breezy.webm";

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
        paymentError: "*Only creator of this expense may confirm payment",
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
        undoPaymentError: "*Only creator of this expense may undo a payment",
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
            <div className="col s10 offset-s1 center">
              <h3 className="mooch-list">
                {mooch} owes {shark} - $
                {(
                  this.state.amount /
                  100 /
                  (this.state.mooches.length +
                    this.state.moochesPaid.length +
                    1)
                ).toFixed(2)}
              </h3>
            </div>
            <div className="col s10 offset-s1 center">
              <button
                onClick={() => this.payButton(user.userID)}
                className="paid-button"
              >
                Confirm Payment
              </button>
            </div>
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
            <div className="col s10 offset-s1 center">
              <h3 className="paid-mooch">
                {paidMooch} owes {shark} - $
                {(
                  this.state.amount /
                  100 /
                  (this.state.mooches.length +
                    this.state.moochesPaid.length +
                    1)
                ).toFixed(2)}
              </h3>
            </div>
            <div className="col s10 offset-s1 center">
              <button
                onClick={() => this.undoPayment(user.userID)}
                className="paid-button"
              >
                Undo Payment
              </button>
            </div>
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
      <div className="page-container">
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div class="bg-video">
            <video
              class="bg-video__content"
              autoplay="autoplay"
              controls={false}
              muted
              loop
            >
              <source src={videoMP4} type="video/mp4" />
              <source src={videoWEBM} type="video/webm" /> Your browser is not
              supported!
            </video>
          </div>
          <div className="create-group-container">
            <div className="row">
              <div className="col s12">
                <div className="create-group-background">
                  <div className="add-expense__header">
                    <div className="add-expense__header-left">
                      <button className="back-button" onClick={this.goBack}>
                        &larr; Back
                      </button>
                    </div>
                    <h1 className="page-heading add-expense__header-center">
                      Expense Overview
                    </h1>
                    <div className="add-expense__header-right">&nbsp;</div>
                  </div>
                  <div className="row">
                    <div className="col s10 offset-s1 center">
                      <h3 className="expense__name">
                        {" "}
                        {this.state.description}
                      </h3>
                    </div>
                    <div className="col s10 offset-s1 center">
                      <h5 className="expense__amount">
                        Amount: $ {(this.state.amount / 100).toFixed(2)}
                      </h5>
                    </div>
                    <div className="col s10 offset-s1 center">
                      <h3 className="expense__creator">Created by: {shark}</h3>
                    </div>
                    <div className="col s10 offset-s1 center mb-medium">
                      <h3 className="error">{this.state.paymentError}</h3>
                    </div>
                    <div className="col l4 s10 offset-s1 offset-l1 center">
                      <h3 className="expense__subtitle expense__subtitle--mooch">
                        Mooches
                      </h3>
                      <div className="row">
                        <div className="col s12">{mooches}</div>
                      </div>
                    </div>
                    <div className="col l4 s10 offset-s1 offset-l2 center">
                      <h3 className="expense__subtitle expense__subtitle--friends">
                        All Paid Up!
                      </h3>
                      <div className="row">
                        <div className="col s12">{moochesPaid}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {this.state.paymentError}
                  {this.state.undoPaymentError}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedUser: state.auth.userID
});

export default connect(mapStateToProps)(ExpenseOverview);
