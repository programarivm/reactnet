<?php

use ReactNet\Config\Constants;
use ReactNet\Filesystem;

require __DIR__  . '/../vendor/autoload.php';
require __DIR__ .  '/../app/config/constants.php';

pcntl_signal(SIGINT, function() {
    Filesystem::removeDir(APP_PATH . '/var');
    exit('Good bye!' . PHP_EOL);
});

Filesystem::makeDir(APP_PATH . '/var', 0775, $argv[2]);
Filesystem::makeDir(APP_PATH . '/var/tmp', 0775, $argv[2]);
Filesystem::makeDir(APP_PATH . '/var/tmp/pcap', 0775, $argv[2]);
Filesystem::makeDir(APP_PATH . '/var/tmp/z', 0775, $argv[2]);
Filesystem::makeDir(APP_PATH . '/var/tmp/z/io', 0775, $argv[2]);
Filesystem::makeDir(APP_PATH . '/var/tmp/z/io/phs', 0775, $argv[2]);

$n = 0;
while (true) {
    $pcap = APP_PATH . "/var/tmp/pcap/$n.pcap";
    $zIoPhs = APP_PATH . "/var/tmp/z/io/phs/$n.txt";
    exec("tcpdump -i {$argv[1]} -c1000 -nn -w $pcap");
    if (file_exists($pcap)) {
        exec("tshark -r $pcap -q -z io,phs > $zIoPhs");
        $n++;
    }
    
    pcntl_signal_dispatch();
}
