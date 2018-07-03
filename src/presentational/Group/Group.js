import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "../Navbar/Navbar";

class Group extends Component {
  componentDidMount = () => {
    this.addGroupsToDatabase();
  };

  addGroupsToDatabase = () => {
    const info = { groups: this.props.groups, userID: this.props.id };
    axios.put("/api/addGroupToUser", info);
  };

  render = () => {
    console.log(this.props);
    return (
      <div>
        <Navbar history={this.props.history} />
        {this.props.match.params.id}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groups,
  id: state.auth.userID.userID
});

export default connect(mapStateToProps)(Group);
