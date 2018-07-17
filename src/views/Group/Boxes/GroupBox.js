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
          <div className="row">
            <div className="col s12">
              <div className="card medium">
                <div className="card-image">
                  <img src={this.state.src} alt="wallpaper" />
                  <span className="card-title groupBox-name" />
                  {/* <a className="btn-floating halfway-fab waves-effect waves-light red">
                    <i className="material-icons">add</i>
                  </a> */}
                </div>
                <div className="card-content">
                  <div>
                    <h5>{this.state.groupName}</h5>
                    <p>{this.state.groupDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default GroupBox;
