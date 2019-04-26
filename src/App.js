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
        this.calcStats(event.data);
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

  calcStats(data) {
    let items = JSON.parse(data);
    let newState = Object.assign({}, this.state);
    // ips
    if (Object.keys(newState.ips.history).length === 0) {
      newState.ips.history = items.ips;
    } else {
      Object.keys(items.ips).forEach(function(key) {
        newState.ips.history.hasOwnProperty(key)
          ? newState.ips.history[key] += items.ips[key]
          : newState.ips.history[key] = items.ips[key];
      });
    }
    let keys = Object.keys(newState.ips.history);
    let occurrences = {};
    for (let i = 0; i < keys.length; i++) {
      !occurrences.hasOwnProperty(newState.ips.history[keys[i]])
        ? occurrences[newState.ips.history[keys[i]]] = 1
        : occurrences[newState.ips.history[keys[i]]] += 1;
    }
    newState.ips.chart.occurrences.labels = Object.keys(occurrences);
    newState.ips.chart.occurrences.datasets[0].data = Object.values(occurrences);
    newState.ips.chart.occurrences.datasets[0].backgroundColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
    // protocols
    newState.protocols.chart.bytes.labels = [];
    newState.protocols.chart.frames.labels = [];
    newState.protocols.chart.bytes.datasets[0].data = [];
    newState.protocols.chart.frames.datasets[0].data = [];
    for (let item of items.protocols) {
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
