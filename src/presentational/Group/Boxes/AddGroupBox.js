import React, { Component } from "react";
import "../Group.css";

class AddGroupBox extends Component {
  directToCreateGroup = () => {
    this.props.history.push("/createGroup");
  };

  render = () => {
    return (
      <div className="addGroupBox" onClick={this.directToCreateGroup}>
        <h1 className="center plus">+</h1>
      </div>
    );
  };
}

export default AddGroupBox;
