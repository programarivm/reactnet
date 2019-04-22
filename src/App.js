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
      protocols: {
        tshark: [],
        chart: {
          labels: [],
          datasets: [
            {
              label: 'Protocols',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: []
            }
          ]
        }
      }
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
    let newState = Object.assign({}, this.state);
    newState.protocols.chart.labels = [];
    newState.protocols.chart.datasets[0].data = [];
    let items = JSON.parse(data);
    for (let item of items) {
      let exists = false;
      for (let protocol of newState.protocols.tshark) {
        if (item.name === protocol.name && item.level === protocol.level && item.parent_name === protocol.parent_name) {
          protocol.frames = parseInt(protocol.frames) + parseInt(item.frames);
          protocol.bytes = parseInt(protocol.bytes) + parseInt(item.bytes);
          newState.protocols.chart.labels.push(protocol.name);
          newState.protocols.chart.datasets[0].data.push(protocol.bytes);
          // TODO frames...
          exists = true;
          break;
        }
      }
      if (!exists) {
        newState.protocols.tshark.push(item);
        newState.protocols.chart.labels.push(item.name);
        newState.protocols.chart.datasets[0].data.push(item.bytes);
        // TODO frames...
      }
    }

    this.setState(newState);
  }

  render() {
    return (
      <div>
        <NavBar stats={this.state} />
      </div>
    );
  }
}

export default App;
