import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AddGroupButton from "../Group/Boxes/AddGroupButton";
import GroupBox from "../Group/Boxes/GroupBox";
import userPhoto from "./../../images/61205.svg";
import "./../../sass/index.scss";

class Dashboard extends Component {
  render = () => {
    console.log(this.props);
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
      <div className="page-container">
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div className="dashboard-container">
            <div className="row">
              <div className="col l12 s12">
                <div className="dashboard-background">
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
                  <div className="row">
                    {groups.length > 0 ? (
                      groups
                    ) : (
                      <div className="col s10 offset-s1 center">
                        <h3 className="groups-message">
                          Create a group to get started!
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <h6 className="footer-name">@Mooch</h6>
          </div>
          <div className="footer-accent" />
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
