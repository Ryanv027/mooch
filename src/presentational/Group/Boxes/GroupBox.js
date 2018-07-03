import React, { Component } from "react";
import axios from "axios";
import "../Group.css";

class GroupBox extends Component {
  state = {
    groupName: ""
  };

  componentDidMount = () => {
    this.groupInfo();
  };
  groupInfo = () => {
    axios
      .get("/api/getGroupData", { params: { groupID: this.props.groupID } })
      .then(response => {
        const groupName = response.data.groupName;
        this.setState({
          groupName
        });
      });
  };

  renderGroup = () => {
    this.props.history.push(`/group/${this.props.groupID}`);
  };
  render = () => {
    return (
      <div className="groupBox" onClick={this.renderGroup}>
        <h5 className="groupBox-name">
          {this.state.groupName.length > 0 ? this.state.groupName : null}
        </h5>
      </div>
    );
  };
}

export default GroupBox;

// .get("/api/users", {
//         params: {
//           userName: this.state.userName,
//           password: this.state.password
//         }
//       })
