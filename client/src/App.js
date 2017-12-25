import React, { Component } from 'react';
import logo from './dickhub.svg';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <img src={logo} alt="logo" />
          <h1>Welcome to DickHub</h1>
        </header>
      </div>
    );
  }
}

export default App;
