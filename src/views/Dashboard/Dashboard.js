import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AddGroupBox from "../Group/Boxes/AddGroupBox";
import GroupBox from "../Group/Boxes/GroupBox";
import "./Dashboard.css";

class Dashboard extends Component {
  render = () => {
    const groups = this.props.groups.map(group => {
      return (
        <GroupBox
          key={Math.random()}
          groupID={group}
          history={this.props.history}
        />
      );
    });
    return (
      <div>
        <Navbar history={this.props.history} />
        <div className="row">
          <div className="groupContainer">
            <div className="col s6 dashboardMargin">
              <AddGroupBox history={this.props.history} />
              {groups}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups
});

export default connect(mapStateToProps)(Dashboard);
