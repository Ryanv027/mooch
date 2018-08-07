import React from "react";

import handMoney from "./../../images/1293751237.svg";

class DebtOverview extends React.Component {
  state = {
    mooches: [],
    financers: []
  };
  componentDidMount = () => {
    this.findMooches();
    this.findFinancers();
  };

  findMooches = () => {
    const users = this.props.groupUserData;
    const mooches = [];
    for (let i = 0; i < users.length; i++) {
      if (parseInt(users[i].balance) < 0) {
        mooches.push(users[i]);
      }
    }
    this.setState({ mooches });
  };

  findFinancers = () => {
    const users = this.props.groupUserData;
    const financers = [];
    for (let i = 0; i < users.length; i++) {
      if (parseInt(users[i].balance) >= 0) {
        financers.push(users[i]);
      }
    }
    this.setState({ financers });
  };

  render() {
    console.log(this.state.mooches);
    const financers = this.state.financers.map(user => {
      return (
        <div className="col s5 offset-s1 mb-medium">
          <h4 className="overview__username">
            {user.userName}{" "}
            <span className="overview__financer">${user.balance}</span>
          </h4>
        </div>
      );
    });

    const mooches = this.state.mooches.map(user => {
      return (
        <div className="col s5 offset-s1 mb-medium">
          <h4 className="overview__username">
            {user.userName}{" "}
            <span className="overview__mooch">${user.balance}</span>
          </h4>
        </div>
      );
    });

    return (
      <div className="group-container">
        <div className="row">
          <div className="col s12">
            <div className="create-group-background overview">
              <div className="add-expense__header">
                <div className="add-expense__header-left">
                  <button
                    className="back-button back-button--overview"
                    onClick={this.props.groupDashboardView}
                  >
                    &larr; Back
                  </button>
                </div>
                <h1 className="overview__heading add-expense__header-center">
                  Debt Overview
                </h1>
                <div className="add-expense__header-right">&nbsp;</div>
              </div>

              <div className="row">
                <div className="col s10 l4 offset-s1 offset-l2 mt-large">
                  <div className="row">
                    <div className="col s10 offset-s1 center">
                      <h3 className="overview__title">Pay Me</h3>
                    </div>
                    <img
                      className="overview__image"
                      alt="hand and moeny"
                      src={handMoney}
                    />
                    {financers}
                  </div>
                </div>
                <div className="col s10 l4 offset-s1 mt-large">
                  <div className="row">
                    <div className="col s10 offset-s1 center">
                      <h3 className="overview__title">Pay Up</h3>
                    </div>
                    {mooches}
                  </div>
                </div>
              </div>
              <div className="room">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DebtOverview;
