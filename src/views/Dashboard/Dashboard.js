import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AddGroupButton from "../Group/Boxes/AddGroupButton";
import GroupBox from "../Group/Boxes/GroupBox";
import "./../../index.css";
import "./../../sass/index.scss";

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
      <div className="background">
        <Navbar history={this.props.history} />
        <div className="container">
          <div className="row">
            <AddGroupButton history={this.props.history} />
          </div>
          <div className="row">{groups}</div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups
});

export default connect(mapStateToProps)(Dashboard);
