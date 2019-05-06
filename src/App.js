import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import calc  from './calc.js';
import './App.css';

const url = 'ws://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
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

    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  handleConnect() {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.setState({
        connected: true
      });
      this.ws.send(this.state.n);
    };

    this.ws.onmessage = event => {
      if (event.data !== 'wait') {
        this.calc(JSON.parse(event.data));
        this.setState({
          n: this.state.n + 1
        });
      }
      setTimeout(() => {
        if (this.state.connected) {
          this.ws.send(this.state.n);
        }
      }, 5000);
    };

    this.ws.onclose = () => {
      this.setState({
        connected: false
      });
    };
  }

  handleDisconnect() {
    this.ws.close();
  }

  calc(data) {
    let newState = Object.assign({}, this.state);
    calc.ips.v4.chart.occurrences(newState.ips.v4.chart.occurrences, data.ips.v4.conv);
    calc.ips.v4.chart.endpoints(newState.ips.v4.chart.endpoints, data.ips.v4.endpoints);
    calc.ips.v6.chart.occurrences(newState.ips.v6.chart.occurrences, data.ips.v6.conv);
    calc.ips.v6.chart.endpoints(newState.ips.v6.chart.endpoints, data.ips.v6.endpoints);
    calc.protocols(newState.protocols, data.protocols);
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <NavBar onConnect={this.handleConnect} onDisconnect={this.handleDisconnect} state={this.state} />
      </div>
    );
  }
}

export default App;
