import React, { Component } from "react";
import "../styles/Group.css";

class AddGroupBox extends Component {
  directToCreateGroup = () => {
    this.props.history.push("/createGroup");
  };

  render = () => {
    return (
      <div className="add-group-box" onClick={this.directToCreateGroup}>
        <h3 className="add-group-box-text">Create Group</h3>
      </div>
    );
  };
}

export default AddGroupBox;
