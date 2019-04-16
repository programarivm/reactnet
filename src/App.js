import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {

  ws = new WebSocket(url);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected');
      this.ws.send('hello');
    };

    this.ws.onmessage = event => {
      console.log(event.data);
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
