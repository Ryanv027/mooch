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
      <div className="navigation">
        <h3 className="navigation__link-left" onClick={this.goHome}>
          Home
        </h3>
        <h2 className="navigation__logo">Mooch</h2>
        <h3 className="navigation__link-right" onClick={this.logout}>
          Logout
        </h3>
      </div>
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
