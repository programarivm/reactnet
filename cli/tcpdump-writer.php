<?php

$path = realpath(__DIR__.'/../traffic');

while (true) {
    $filename = time() . '.txt';
    exec("tcpdump -i {$argv[1]} -c1000 -nn > $path/$filename");
}
