import React, { Component } from 'react';
//import axios from 'axios';
import { login } from './../../actions/auth';
import { connect } from 'react-redux';

import styles from './Login.css';

class Login extends Component {
  state = {
    user: {}
  }

  componentDidMount = () => {
    console.log(this.state.user)
  }

  componentDidUpdate = () => {
    console.log(this.state.user)
  }

  handleLogin = () => {
    this.props.Login('User ID')
  }

  handleCheck = () => {
    const user = this.props.data
    this.setState({user})
  }
  render = () => {
    return (
      <div className={styles.loginContainer}>
        <h1>Login...if you dare.</h1> 
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleCheck}>Check</button>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => ({
  data: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    Login: (id) => {
      console.log('hit login dispatch')
    return dispatch(login(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
