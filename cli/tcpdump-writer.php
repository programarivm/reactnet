<?php

use ReactNet\Config\Constants;

require __DIR__  . '/../vendor/autoload.php';
require __DIR__ .  '/../reactphp/config/constants.php';

$i = 0;
while (true) {
    $filename = "$i.txt";
    exec("tcpdump -i {$argv[1]} -c1000 -nn > " . APP_PATH . "/traffic/$filename");
    $i++;
}
