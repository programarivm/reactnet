import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {

  ws = new WebSocket(url);

  constructor(props) {
    super(props);

    this.state = {
      n: 0,
      protocols: []
    };
  }

  componentDidMount() {

    this.ws.onopen = () => {
      this.ws.send(this.state.n);
    };

    this.ws.onmessage = event => {
      if (event.data !== 'wait') {
        this.process(event.data);
        this.setState({
          n: this.state.n + 1
        });
      }
      setTimeout(() => {
          this.ws.send(this.state.n);
      }, 5000);
    };

    this.ws.onclose = () => {
      console.log('disconnected');
      // TODO ...
    };
  }

  process(data) {
    let items = JSON.parse(data);
    for (let item of items) {
      let exists = false;
      for (let protocol of this.state.protocols) {
        if (item.name === protocol.name && item.level === protocol.level && item.parent_name === protocol.parent_name) {
          protocol.frames = parseInt(protocol.frames) + parseInt(item.frames);
          protocol.bytes = parseInt(protocol.bytes) + parseInt(item.bytes);
          exists = true;
          break;
        }
      }
      if (!exists) {
        let newState = Object.assign({}, this.state);
        newState.protocols.push(item);
        this.setState(newState);
      }
    }
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
