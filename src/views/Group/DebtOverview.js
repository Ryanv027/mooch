import React from "react";

class DebtOverview extends React.Component {
  render() {
    return (
      <div>
        <h1>DEBT OVERVIEW</h1>
        <button onClick={this.props.groupDashboardView}>GroupDashboard</button>
      </div>
    );
  }
}

export default DebtOverview;
