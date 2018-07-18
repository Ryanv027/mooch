import React, { Component } from "react";
import axios from "axios";
import "../Group.css";

class GroupBox extends Component {
  state = {
    groupName: "",
    groupDescription: "",
    src:
      "https://i.pinimg.com/originals/70/f5/43/70f5434216f0fb0a45c4d75d83f41b5b.jpg"
  };

  componentDidMount = () => {
    this.groupInfo();
  };
  groupInfo = () => {
    axios
      .get("/api/getGroupData", { params: { groupID: this.props.groupID } })
      .then(response => {
        this.setState({
          groupName: response.data.groupName,
          groupDescription: response.data.groupDescription
        });
      });
  };

  renderGroup = () => {
    this.props.history.push(`/group/${this.props.groupID}`);
  };

  render = () => {
    return (
      <div className="individualbox col s3">
        <div className="groupBox" onClick={this.renderGroup}>
          <h1 className="group-title">{this.state.groupName}</h1>
          <h4 className="group-description">{this.state.groupDescription}</h4>
        </div>
      </div>
    );
  };
}

export default GroupBox;
