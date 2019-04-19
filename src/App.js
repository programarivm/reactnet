import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {

  ws = new WebSocket(url);

  n = 0;

  componentDidMount() {

    this.ws.onopen = () => {
      this.ws.send(this.n);
    };

    this.ws.onmessage = event => {
      if (event.data !== 'wait') {
          // TODO ...
          this.n += 1;
      }
      setTimeout(() => {
          this.ws.send(this.n);
      }, 5000);
    };

    this.ws.onclose = () => {
      this.setState({
        ws: new WebSocket(url)
      });
    };
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default App;
