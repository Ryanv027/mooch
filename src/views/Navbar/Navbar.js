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
    const logoStyle = {
      color: "black",
      fontSize: "40px"
    };

    const linkStyles = {
      fontSize: "25px",
      color: "black"
    };

    return (
      <nav className="navbar nav-extended">
        <div className="nav-wrapper">
          <a className="brand-logo center" style={logoStyle}>
            MOOCH
          </a>
          <div className="left hide-on-med-and-down">
            <ul>
              <li>
                <a className="padL medium-size" onClick={this.goHome}>
                  DASHBOARD
                </a>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li>
                <a
                  className="padR medium-size hide-on-med-and-down"
                  onClick={this.logout}
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-content hide-on-large-only medium-size">
          <ul className="tabs">
            <li className="tab">
              <a onClick={this.goHome} style={linkStyles}>
                HOME
              </a>{" "}
            </li>
            <li className="tab">
              <a onClick={this.logout} style={linkStyles}>
                LOGOUT
              </a>{" "}
            </li>
          </ul>
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
