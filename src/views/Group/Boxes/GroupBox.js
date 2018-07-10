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
        <div className="row">
          <div className="xyz col s12">
            <div className="card">
              <div className="card-image">
                <img src="http://wallpaperheart.com/wp-content/uploads/2018/03/scenery-wallpaper-hd-2.jpg" />
                <span className="card-title groupBox-name">
                  <p>{this.state.groupName.length > 0 ? this.state.groupName : null}</p>
                </span>
                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
              </div>
              <div className="card-content">
                <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    // <div className="groupBox" onClick={this.renderGroup}>
    //     <h5 className="groupBox-name">
    //       <p>{this.state.groupName.length > 0 ? this.state.groupName : null}</p>
    //     </h5>
    //   </div>
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