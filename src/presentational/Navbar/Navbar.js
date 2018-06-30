import React, { Component } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

class Navbar extends Component {
  goHome = () => {
    this.props.history.push("/");
  };

  logout = () => {
    this.props.logout();
  };

  render = () => {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo center">mooch</a>
          <div className="left">
            <ul>
              <li>
                <a className="padL" onClick={this.goHome}>
                  home
                </a>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li>
                <a className="padR" onClick={this.logout}>
                  logout
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
  logout: () => dispatch(logout())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Navbar);
