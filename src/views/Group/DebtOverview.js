import React from "react";

class DebtOverview extends React.Component {
  render() {
    return (
      <div>
        <h1>DEBT OVERVIEW</h1>
        <button className="col s12 btn btn-large waves-effect waves-light green-accent-2" onClick={this.props.groupDashboardView}>Back To Group Dashboard</button>
      </div>
    );
  }
}

export default DebtOverview;
