<?php

use ReactNet\Config\Constants;
use ReactNet\Filesystem\Dir;

require __DIR__  . '/../vendor/autoload.php';
require __DIR__ .  '/../app/config/constants.php';

pcntl_signal(SIGINT, function() {
    Dir::remove(APP_PATH . '/var');
    exit('Good bye!' . PHP_EOL);
});

Dir::make(APP_PATH . '/var', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/pcap', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/conv', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/conv/ip', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/conv/ipv6', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/endpoints', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/endpoints/ipv6', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/io', 0775, $argv[2]);
Dir::make(APP_PATH . '/var/tmp/z/io/phs', 0775, $argv[2]);

$n = 0;
while (true) {
    $pcap = APP_PATH . "/var/tmp/pcap/$n.pcap";
    $zConvIp = APP_PATH . "/var/tmp/z/conv/ip/$n.txt";
    $zConvIpv6 = APP_PATH . "/var/tmp/z/conv/ipv6/$n.txt";
    $zEndpointsIpv6 = APP_PATH . "/var/tmp/z/endpoints/ipv6/$n.txt";
    $zIoPhs = APP_PATH . "/var/tmp/z/io/phs/$n.txt";
    exec("tcpdump -i {$argv[1]} -c1000 -nn -w $pcap");
    if (file_exists($pcap)) {
        exec("tshark -r $pcap -q -z conv,ip > $zConvIp");
        exec("tshark -r $pcap -q -z conv,ipv6 > $zConvIpv6");
        exec("tshark -r $pcap -q -z endpoints,ipv6 > $zEndpointsIpv6");
        exec("tshark -r $pcap -q -z io,phs > $zIoPhs");
        $n++;
    }

    pcntl_signal_dispatch();
}
