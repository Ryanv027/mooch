import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AddGroupButton from "../Group/Boxes/AddGroupButton";
import GroupBox from "../Group/Boxes/GroupBox";
import "./../../index.css";
import "./../../sass/index.scss";

class Dashboard extends Component {
  render = () => {
    console.log(this.props);
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
      <div className="page-container">
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div className="dashboard-container">
            <div className="row">
              <AddGroupButton history={this.props.history} />
            </div>
            <div className="row">{groups}</div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups,
  user: state.auth
});

export default connect(mapStateToProps)(Dashboard);
