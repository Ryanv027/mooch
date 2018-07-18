import React, { Component } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";
import { logoutGroups } from "./../../actions/groups";

class Navbar extends Component {
  goHome = () => {
    this.props.history.push("/dashboard");
  };

  logout = () => {
    this.props.logout();
  };

  render = () => {
    return (
      <nav className="navvy">
        <div className="nav-wrapper">
          <a className="brand-logo center large-size">MOOCH</a>
          <div className="left">
            <ul>
              <li>
                <a className="padL medium-size" onClick={this.goHome}>
                  HOME
                </a>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li>
                <a className="padR medium-size" onClick={this.logout}>
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  logoutGroups: () => dispatch(logoutGroups())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Navbar);
