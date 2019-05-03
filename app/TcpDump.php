<?php

namespace ReactNet;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use ReactNet\Filesystem\Dir;
use ReactNet\TShark\Z as TSharkZ;

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

    public function onMessage(ConnectionInterface $from, $n)
    {
        $next = (int) $n + 1;
        if (file_exists(APP_PATH . "/var/tmp/z/io/phs/$next.txt")) {
            if (file_exists(APP_PATH . "/var/tmp/z/io/phs/$n.txt")) {
                $this->client->send(
                    json_encode([
                        'ips' => [
                            'v4' => [
                                'conv' => (new TSharkZ(APP_PATH . "/var/tmp/z/conv/ip/$n.txt"))->convIp(),
                                'endpoints' => (new TSharkZ(APP_PATH . "/var/tmp/z/endpoints/ip/$n.txt"))->endpointsIp(),
                            ],
                            'v6' => [
                                'conv' => (new TSharkZ(APP_PATH . "/var/tmp/z/conv/ipv6/$n.txt"))->convIpv6(),
                                'endpoints' => (new TSharkZ(APP_PATH . "/var/tmp/z/endpoints/ipv6/$n.txt"))->endpointsIpv6(),
                            ],
                        ],
                        'protocols' => (new TSharkZ(APP_PATH . "/var/tmp/z/io/phs/$n.txt"))->ioPhs(),
                    ])
                );
                unlink(APP_PATH . "/var/tmp/pcap/$n.pcap");
                unlink(APP_PATH . "/var/tmp/z/conv/ipv6/$n.txt");
                unlink(APP_PATH . "/var/tmp/z/io/phs/$n.txt");
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
}
