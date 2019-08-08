import ActionTypes from '../constants/AppConstants';
import AppDispatcher from "../dispatcher/AppDispatcher.js";
import Calc from '../utils/Calc.js';
import { EventEmitter } from 'events';

const url = 'ws://localhost:3001';

class AppStore extends EventEmitter {
	constructor() {
		super();
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
	}

	getState() {
		return this.state;
	}

	connect() {
		this.ws = new WebSocket(url);

		this.ws.onopen = () => {
			this.state.connected = true;
			this.ws.send(this.state.n);
		};

		this.ws.onmessage = event => {
			if (event.data !== 'wait') {
				this.calc(JSON.parse(event.data));
				this.state.n = this.state.n + 1;
			}
			setTimeout(() => {
				if (this.state.connected) {
					this.ws.send(this.state.n);
					this.emit("update");
				}
			}, 5000);
		};

		this.ws.onclose = () => {
			this.state.connected = false;
		};
	}

	disconnect() {
		this.ws.close();
	}

	calc(data) {
		let newState = Object.assign({}, this.state);
		Calc.ips.v4.chart.occurrences(newState.ips.v4.chart.occurrences, data.ips.v4.conv);
		Calc.ips.v4.chart.endpoints(newState.ips.v4.chart.endpoints, data.ips.v4.endpoints);
		Calc.ips.v6.chart.occurrences(newState.ips.v6.chart.occurrences, data.ips.v6.conv);
		Calc.ips.v6.chart.endpoints(newState.ips.v6.chart.endpoints, data.ips.v6.endpoints);
		Calc.protocols(newState.protocols, data.protocols);
		this.state = newState;
	}

	handleActions(action) {
		switch (action.type) {
			case ActionTypes.CONNECT:
				this.connect();
				break;
			case ActionTypes.DISCONNECT:
				this.disconnect();
				break;
			default:
        // do nothing
		}
	}
}

const appStore = new AppStore();
AppDispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;
