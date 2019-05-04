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

  calcEndpointsIpv6(endpoints, data) {
    if (endpoints.history.length === 0) {
      endpoints.history = data.ips.v6.endpoints;
    } else {
      endpoints.labels = [];
      endpoints.datasets[0].data = [];
      endpoints.datasets[1].data = [];
      endpoints.datasets[2].data = [];
      endpoints.datasets[3].data = [];
      endpoints.datasets[4].data = [];
      endpoints.datasets[5].data = [];
      for (let endpoint of data.ips.v6.endpoints) {
        let exists = false;
        for (let history of endpoints.history) {
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
          endpoints.history.push(endpoint);
        }
      }
      endpoints.history.sort(function (a, b) {
        return b.bytes - a.bytes;
      });
      // the twenty busiest endpoints
      for (let i = 0; i < 20; i++) {
        let item = endpoints.history[i];
        if (item !== undefined) {
          endpoints.labels.push(item.ip);
          endpoints.datasets[0].data.push(item.packets);
          endpoints.datasets[1].data.push(item.bytes);
          endpoints.datasets[2].data.push(item.tx_packets);
          endpoints.datasets[3].data.push(item.tx_bytes);
          endpoints.datasets[4].data.push(item.rx_packets);
          endpoints.datasets[5].data.push(item.rx_bytes);
        }
      }
    }
  }

  calcIpv4(occurrences, data) {
    if (Object.keys(occurrences.history).length === 0) {
      occurrences.history = data.ips.v4.conv;
    } else {
      Object.keys(data.ips.v4.conv).forEach((key) => {
        occurrences.history.hasOwnProperty(key)
          ? occurrences.history[key] += data.ips.v4.conv[key]
          : occurrences.history[key] = data.ips.v4.conv[key];
      });
    }
    let items = helpers.countOccurrences(occurrences.history);
    occurrences.labels = Object.values(items);
    occurrences.datasets[0].data = Object.keys(items);
    occurrences.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    occurrences.history = helpers.sortObject(occurrences.history);
  }

  calcIpv6(occurrences, data) {
    if (Object.keys(occurrences.history).length === 0) {
      occurrences.history = data.ips.v6.conv;
    } else {
      Object.keys(data.ips.v6.conv).forEach((key) => {
        occurrences.history.hasOwnProperty(key)
          ? occurrences.history[key] += data.ips.v6.conv[key]
          : occurrences.history[key] = data.ips.v6.conv[key];
      });
    }
    let items = helpers.countOccurrences(occurrences.history);
    occurrences.labels = Object.values(items);
    occurrences.datasets[0].data = Object.keys(items);
    occurrences.datasets[0].backgroundColor.push('#'+Math.floor(Math.random()*16777215).toString(16));
    occurrences.history = helpers.sortObject(occurrences.history);
  }

  calcProtocols(protocols, data) {
    protocols.chart.bytes.labels = [];
    protocols.chart.frames.labels = [];
    protocols.chart.bytes.datasets[0].data = [];
    protocols.chart.frames.datasets[0].data = [];
    for (let item of data.protocols) {
      let exists = false;
      for (let protocol of protocols.tshark) {
        if (item.name === protocol.name && item.level === protocol.level && item.parent_name === protocol.parent_name) {
          protocol.bytes = parseInt(protocol.bytes) + parseInt(item.bytes);
          protocol.frames = parseInt(protocol.frames) + parseInt(item.frames);
          protocols.chart.bytes.labels.push(protocol.name);
          protocols.chart.frames.labels.push(protocol.name);
          protocols.chart.bytes.datasets[0].data.push(protocol.bytes);
          protocols.chart.frames.datasets[0].data.push(protocol.frames);
          exists = true;
          break;
        }
      }
      if (!exists) {
        protocols.tshark.push(item);
        protocols.chart.bytes.labels.push(item.name);
        protocols.chart.frames.labels.push(item.name);
        protocols.chart.bytes.datasets[0].data.push(item.bytes);
        protocols.chart.frames.datasets[0].data.push(item.frames);
      }
    }
  }

  calcStats(data) {
    let newState = Object.assign({}, this.state);
    this.calcEndpointsIpv6(newState.ips.v6.chart.endpoints, data);
    this.calcIpv4(newState.ips.v4.chart.occurrences, data);
    this.calcIpv6(newState.ips.v6.chart.occurrences, data);
    this.calcProtocols(newState.protocols, data);
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
