import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import AddGroupBox from "../Group/Boxes/AddGroupBox";
import GroupBox from "../Group/Boxes/GroupBox";
import "./Dashboard.css";

class Dashboard extends Component {
  state = {};

  render = () => {
    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="row">
          <div className="groupContainer">
            <div className="col s6 dashboardMargin">
              <AddGroupBox history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Dashboard;
