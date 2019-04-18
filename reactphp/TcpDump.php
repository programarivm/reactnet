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
        $next = (int) $msg + 1;
        if (file_exists(APP_PATH . "/traffic/$next.txt")) {
            $content = file_get_contents(APP_PATH . "/traffic/$msg.txt");
            $this->client->send($content);
        } else {
            $this->client->send('wait');
        }
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
