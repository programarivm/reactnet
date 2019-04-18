import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {

  ws = new WebSocket(url);

  n = 0;

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
      this.ws.send(this.n);
    };

    this.ws.onmessage = event => {
      if (event.data !== 'wait') {
          console.log(event.data);
          // TODO ...
          this.n += 1;
      }

      this.ws.send(this.n);
    };

    this.ws.onclose = () => {
      console.log('disconnected');
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
