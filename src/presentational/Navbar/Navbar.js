import React, { Component } from "react";
import styles from "./Navbar.css";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

class Navbar extends Component {
  sayHello = () => {
    console.log("hello!");
  };

  logout = () => {
    console.log("hit logout");
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
                <a className={styles.padL} onClick={this.logout}>
                  home
                </a>
              </li>
            </ul>
          </div>
          <div className="right">
            <ul>
              <li>
                <a className={styles.padR} onClick={this.logout}>
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
