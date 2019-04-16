<?php

namespace ReactNet;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class TcpDump implements MessageComponentInterface
{
    private $client;

    public function __construct()
    {
        echo 'New TcpDump server listening...' . PHP_EOL;
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->client = $conn;

        echo "New connection! ({$conn->resourceId})" . PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $this->client->send('foo');
    }

    public function onClose(ConnectionInterface $conn)
    {
        echo "Connection {$conn->resourceId} has disconnected" . PHP_EOL;
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}" . PHP_EOL;

        $conn->close();
    }
}
