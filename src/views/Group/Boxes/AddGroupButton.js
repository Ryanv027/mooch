import React, { Component } from "react";

class AddGroupBox extends Component {
  directToCreateGroup = () => {
    this.props.history.push("/createGroup");
  };

  render = () => {
    return (
      <div className="add-group-button" onClick={this.directToCreateGroup}>
        <h3 className="add-group-button-text">Create Group</h3>
      </div>
    );
  };
}

export default AddGroupBox;
