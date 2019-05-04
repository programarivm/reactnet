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
        v4: {
          chart: {
            occurrences: {
              history: {},
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
        v6: {
          chart: {
            occurrences: {
              history: {},
              labels: [],
              datasets: [
                {
                  data: [],
                  backgroundColor: [],
                  label: 'IPs'
                }
              ]
            },
            endpoints: {
              history: [],
              labels: [],
              datasets: [
                {
                  label: 'Packets',
                  backgroundColor: '#34877a',
                  data: []
                },
                {
                  label: 'Bytes',
                  backgroundColor: '#2e796d',
                  data: []
                },
                {
                  label: 'TX packets',
                  backgroundColor: '#296c61',
                  data: []
                },
                {
                  label: 'TX bytes',
                  backgroundColor: '#245e55',
                  data: []
                },
                {
                  label: 'RX packets',
                  backgroundColor: '#1f5149',
                  data: []
                },
                {
                  label: 'RX bytes',
                  backgroundColor: '#1a433d',
                  data: []
                }
              ]
            }
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

  calcEndpointsIpv6(newState, data) {
    newState.ips.v6.chart.endpoints.labels = [];
    newState.ips.v6.chart.endpoints.datasets[0].data = [];
    newState.ips.v6.chart.endpoints.datasets[1].data = [];
    newState.ips.v6.chart.endpoints.datasets[2].data = [];
    newState.ips.v6.chart.endpoints.datasets[3].data = [];
    newState.ips.v6.chart.endpoints.datasets[4].data = [];
    newState.ips.v6.chart.endpoints.datasets[5].data = [];
    if (newState.ips.v6.chart.endpoints.history.length === 0) {
      newState.ips.v6.chart.endpoints.history = data.ips.v6.endpoints;
    } else {
      for (let endpoint of data.ips.v6.endpoints) {
        let exists = false;
        for (let history of newState.ips.v6.chart.endpoints.history) {
          if (history.ip === endpoint.ip) {
            history.packets = +history.packets + +endpoint.packets;
            history.bytes = +history.bytes + +endpoint.bytes;
            history.tx_packets = +history.tx_packets + +endpoint.tx_packets;
            history.tx_bytes = +history.tx_bytes + +endpoint.tx_bytes;
            history.rx_packets = +history.rx_packets + +endpoint.rx_packets;
            history.rx_bytes = +history.rx_bytes + +endpoint.rx_bytes;
            exists = true;
            break;
          }
        }
        if (!exists) {
          newState.ips.v6.chart.endpoints.history.push(endpoint);
        }
      }
      newState.ips.v6.chart.endpoints.history.sort(function (a, b) {
        return b.bytes - a.bytes;
      });
      for (let history of newState.ips.v6.chart.endpoints.history) {
        newState.ips.v6.chart.endpoints.labels.push(history.ip);
        newState.ips.v6.chart.endpoints.datasets[0].data.push(history.packets);
        newState.ips.v6.chart.endpoints.datasets[1].data.push(history.bytes);
        newState.ips.v6.chart.endpoints.datasets[2].data.push(history.tx_packets);
        newState.ips.v6.chart.endpoints.datasets[3].data.push(history.tx_bytes);
        newState.ips.v6.chart.endpoints.datasets[4].data.push(history.rx_packets);
        newState.ips.v6.chart.endpoints.datasets[5].data.push(history.rx_bytes);
      }
    }
  }

  calcIpv4(newState, data) {
    if (Object.keys(newState.ips.v4.chart.occurrences.history).length === 0) {
      newState.ips.v4.chart.occurrences.history = data.ips.v4.conv;
    } else {
      Object.keys(data.ips.v4.conv).forEach((key) => {
        newState.ips.v4.chart.occurrences.history.hasOwnProperty(key)
          ? newState.ips.v4.chart.occurrences.history[key] += data.ips.v4.conv[key]
          : newState.ips.v4.chart.occurrences.history[key] = data.ips.v4.conv[key];
      });
    }
    let occurrences = helpers.countOccurrences(newState.ips.v4.chart.occurrences.history);
    newState.ips.v4.chart.occurrences.labels = Object.values(occurrences);
    newState.ips.v4.chart.occurrences.datasets[0].data = Object.keys(occurrences);
    newState.ips.v4.chart.occurrences.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    newState.ips.v4.chart.occurrences.history = helpers.sortObject(newState.ips.v4.chart.occurrences.history);
  }

  calcIpv6(newState, data) {
    if (Object.keys(newState.ips.v6.chart.occurrences.history).length === 0) {
      newState.ips.v6.chart.occurrences.history = data.ips.v6.conv;
    } else {
      Object.keys(data.ips.v6.conv).forEach((key) => {
        newState.ips.v6.chart.occurrences.history.hasOwnProperty(key)
          ? newState.ips.v6.chart.occurrences.history[key] += data.ips.v6.conv[key]
          : newState.ips.v6.chart.occurrences.history[key] = data.ips.v6.conv[key];
      });
    }
    let occurrences = helpers.countOccurrences(newState.ips.v6.chart.occurrences.history);
    newState.ips.v6.chart.occurrences.labels = Object.values(occurrences);
    newState.ips.v6.chart.occurrences.datasets[0].data = Object.keys(occurrences);
    newState.ips.v6.chart.occurrences.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    newState.ips.v6.chart.occurrences.history = helpers.sortObject(newState.ips.v6.chart.occurrences.history);
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
    this.calcEndpointsIpv6(newState, data);
    this.calcIpv4(newState, data);
    this.calcIpv6(newState, data);
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
