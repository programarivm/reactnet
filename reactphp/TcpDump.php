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

    public function __destruct()
    {
        self::deleteTraffic();
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->client = $conn;

        echo "New connection! ({$conn->resourceId})" . PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $n)
    {
        $next = (int) $n + 1;
        if (file_exists(APP_PATH . "/traffic/$next.txt")) {
            if (file_exists(APP_PATH . "/traffic/$n.txt")) {
                $this->client->send(file_get_contents(APP_PATH . "/traffic/$n.txt"));
                unlink(APP_PATH . "/traffic/$n.txt");
            }
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

    public static function deleteTraffic()
    {
        $files = glob(APP_PATH . "/traffic/*.txt");
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }
}
