import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import AddGroupButton from "../Group/Boxes/AddGroupButton";
import GroupBox from "../Group/Boxes/GroupBox";
import "./../../index.css";
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

    //  <AddGroupButton history={this.props.history} />
    //               <div className="row">{groups}</div>

    return (
      <div className="page-container">
        <Navbar history={this.props.history} />
        <div className="background-color">
          <div className="dashboard-container">
            <div className="row">
              <div className="col l12">
                <div className="dashboard-background">
                  <div className="row flex mt-small">
                    <div className="col l2 offset-l1">
                      <AddGroupButton history={this.props.history} />
                    </div>
                    <div className="col l4 offset-1">
                      <h3 className="page-heading">Dashboard</h3>
                    </div>
                    <div className="col l2 offset-l2 flex">
                      <h6 className="user-greeting">{`Hello, ${
                        this.props.user.userName
                      }!`}</h6>
                    </div>
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

const mapStateToProps = state => ({
  groups: state.groups,
  user: state.auth
});

export default connect(mapStateToProps)(Dashboard);
