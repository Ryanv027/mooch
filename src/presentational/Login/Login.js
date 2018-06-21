import React, { Component } from 'react';
import axios from 'axios';

import styles from './Login.css';

class Login extends Component {

  handleLogin = () => {
    axios.get('/auth/google')
      .then(response => {
        console.log(response)
      })
  }
  render(){
    return (
      <div className={styles.loginContainer}>
        <h1>Login...if you dare.</h1> 
        <button onClick={this.handleLogin}>Login with Google</button>
      </div>
    )
  }
};

export default Login;