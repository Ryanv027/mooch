import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios.get('/api/test')
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <h1>What's up</h1>
      </div>
    );
  }
}

export default App;
