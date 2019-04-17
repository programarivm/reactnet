<?php

namespace ReactNet;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use ReactNet\TcpDump;

require __DIR__  . '/../vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new TcpDump()
        )
    ),
    3001
);

$server->run();
