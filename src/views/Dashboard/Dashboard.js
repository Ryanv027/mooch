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
      <div className="row">
        <Navbar history={this.props.history} />
          <AddGroupBox history={this.props.history} />
            <center>
            {groups}
          </center>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups
});

export default connect(mapStateToProps)(Dashboard);
