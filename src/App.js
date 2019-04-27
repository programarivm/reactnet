import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import helpers  from './helpers.js';
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {

  ws = new WebSocket(url);

  constructor(props) {
    super(props);

    this.state = {
      n: 0,
      ips: {
        history: {},
        chart: {
          occurrences: {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: [],
                label: 'IPs'
              }
            ]
          }
        }
      },
      protocols: {
        tshark: [],
        chart: {
          bytes: {
            labels: [],
            datasets: [
              {
                label: 'Bytes',
                backgroundColor: '#36A2EB',
                data: []
              }
            ]
          },
          frames: {
            labels: [],
            datasets: [
              {
                label: 'Frames',
                backgroundColor: '#FFCE56',
                data: []
              }
            ]
          }
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
        this.calcStats(JSON.parse(event.data));
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

  calcIps(newState, data) {
    if (Object.keys(newState.ips.history).length === 0) {
      newState.ips.history = data.ips;
    } else {
      Object.keys(data.ips).forEach((key) => {
        newState.ips.history.hasOwnProperty(key)
          ? newState.ips.history[key] += data.ips[key]
          : newState.ips.history[key] = data.ips[key];
      });
    }
    let occurrences = helpers.countOccurrences(newState.ips.history);
    newState.ips.chart.occurrences.labels = Object.values(occurrences);
    newState.ips.chart.occurrences.datasets[0].data = Object.keys(occurrences);
    newState.ips.chart.occurrences.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    newState.ips.history = helpers.sortObject(newState.ips.history);
  }

  calcProtocols(newState, data) {
    newState.protocols.chart.bytes.labels = [];
    newState.protocols.chart.frames.labels = [];
    newState.protocols.chart.bytes.datasets[0].data = [];
    newState.protocols.chart.frames.datasets[0].data = [];
    for (let item of data.protocols) {
      let exists = false;
      for (let protocol of newState.protocols.tshark) {
        if (item.name === protocol.name && item.level === protocol.level && item.parent_name === protocol.parent_name) {
          protocol.bytes = parseInt(protocol.bytes) + parseInt(item.bytes);
          protocol.frames = parseInt(protocol.frames) + parseInt(item.frames);
          newState.protocols.chart.bytes.labels.push(protocol.name);
          newState.protocols.chart.frames.labels.push(protocol.name);
          newState.protocols.chart.bytes.datasets[0].data.push(protocol.bytes);
          newState.protocols.chart.frames.datasets[0].data.push(protocol.frames);
          exists = true;
          break;
        }
      }
      if (!exists) {
        newState.protocols.tshark.push(item);
        newState.protocols.chart.bytes.labels.push(item.name);
        newState.protocols.chart.frames.labels.push(item.name);
        newState.protocols.chart.bytes.datasets[0].data.push(item.bytes);
        newState.protocols.chart.frames.datasets[0].data.push(item.frames);
      }
    }
  }

  calcStats(data) {
    let newState = Object.assign({}, this.state);
    this.calcIps(newState, data);
    this.calcProtocols(newState, data);
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
