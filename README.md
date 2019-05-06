## ReactNet

A real-time network traffic monitoring tool that uses a web interface with charts.

<p align="center">
	<img src="https://github.com/programarivm/reactnet/blob/master/resources/01-figure-ipv4.png" />
	<br/>
	<b>Figure 1</b>. Occurrences and endpoints of IPv4 addresses.
</p>

<p align="center">
	<img src="https://github.com/programarivm/reactnet/blob/master/resources/02-figure-protocols.png" />
	<br/>
	<b>Figure 2</b>. Protocol hierarchy statistics listing both number of packets and bytes.
</p>

## 1. Server

### 1.1. `tcpdump` writer

	php cli/tcpdump-writer.php eth0 $USER

`tcpdump-writer.php` sniffs the network traffic and stores the resulting `.pcap` files in the `var/tmp` folder for statistical analysis with `tshark`.

> This is how to set up `tcpdump` in order to capture packets as a non-root user:

    sudo groupadd pcap
    sudo usermod -a -G pcap $USER

    sudo chgrp pcap /usr/sbin/tcpdump
    sudo chmod 750 /usr/sbin/tcpdump

    sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump

### 1.2. WebSocket server

    php cli/ws-server.php

## 2. Client

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Contributions

Would you help make this app better? Contributions are welcome.

- Feel free to send a pull request
- Drop an email at info@programarivm.com with the subject "ReactNet Contributions"
- Say hello on [Twitter](https://twitter.com/programarivm)

Many thanks.
