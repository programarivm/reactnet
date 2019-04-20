## ReactNet

A real-time network traffic monitoring tool that uses a web interface with charts.

## 1. Server

### 1.1. `tcpdump` writer

`tcpdump-writer.php` sniffs the network traffic and stores the resulting `.pcap` files in the `var/tmp` folder for statistical analysis purposes. This is how to set up `tcpdump` in order to capture packets as a non-root user:

    sudo groupadd pcap
    sudo usermod -a -G pcap $USER

    sudo chgrp pcap /usr/sbin/tcpdump
    sudo chmod 750 /usr/sbin/tcpdump

    sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump

Then you are ready to run:

    php cli/tcpdump-writer.php eth0 $USER

### 1.2. WebSocket server

    php cli/ws-server.php

## 2. Client

### 2.1. Development mode

    npm start

> TODO: Write documentation.
