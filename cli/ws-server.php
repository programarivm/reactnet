<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use ReactNet\Filesystem\Dir;
use ReactNet\TcpDump;

require __DIR__  . '/../vendor/autoload.php';
require __DIR__ .  '/../app/config/constants.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new TcpDump()
        )
    ),
    3001
);

$server->run();
