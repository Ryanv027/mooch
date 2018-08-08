import React, { Component } from "react";
import { connect } from "react-redux";

import Navbar from "../Navbar/Navbar";
import AddGroupButton from "../Group/Boxes/AddGroupButton";
import GroupBox from "../Group/Boxes/GroupBox";
import userPhoto from "./../../images/61205.svg";
import Footer from "./../components/Footer";

import videoMP4 from "./../../videos/Breezy.mp4";
import videoWEBM from "./../../videos/Breezy.webm";

class Dashboard extends Component {
  render = () => {
    // console.log(this.props);
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
      <div>
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div className="dashboard-container">
            <div className="dashboard-background">
              <div className="page-container">
                <div className="dashboard-header mt-small">
                  <AddGroupButton history={this.props.history} />

                  <h3 className="dashboard-header__heading">Dashboard</h3>

                  <h6 className="user-greeting">
                    <span>
                      <img
                        src={userPhoto}
                        alt="photo"
                        className="user-greeting__photo"
                      />
                    </span>
                    {`Hello, ${this.props.user.userName}!`}
                  </h6>
                </div>
                <div className="group-box-container mt-large">
                  {groups.length > 0 ? (
                    groups
                  ) : (
                    <div className="col s12 center quick-fix">
                      <h3 className="groups-message">
                        Create a group to get started!
                      </h3>
                    </div>
                  )}
                </div>
              </div>
              <Footer />
            </div>
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
