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
        tshark: [],
        chart: {
          src: {
            labels: [],
            datasets: [
              {
                label: 'Source',
                backgroundColor: [],
                data: []
              }
            ]
          },
          dest: {
            labels: [],
            datasets: [
              {
                label: 'Destination',
                backgroundColor: [],
                data: []
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
    // source
    let labelsSrc = Object.keys(items.ips.src);
    let dataSrc = Object.values(items.ips.src);
    for (let i = 0; i < labelsSrc.length; i++) {
      if (!newState.ips.chart.src.datasets[0].data.includes(labelsSrc[i])) {
        newState.ips.chart.src.labels.push(labelsSrc[i]);
        newState.ips.chart.src.datasets[0].data.push(dataSrc[i]);
        newState.ips.chart.src.datasets[0].backgroundColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      }
    }
    // destination
    let labelsDest = Object.keys(items.ips.dest);
    let dataDest = Object.values(items.ips.dest);
    for (let i = 0; i < labelsDest.length; i++) {
      if (!newState.ips.chart.dest.datasets[0].data.includes(labelsDest[i])) {
        newState.ips.chart.dest.labels.push(labelsDest[i]);
        newState.ips.chart.dest.datasets[0].data.push(dataDest[i]);
        newState.ips.chart.dest.datasets[0].backgroundColor.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      }
    }
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
