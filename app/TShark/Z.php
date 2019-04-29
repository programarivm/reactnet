<?php

namespace ReactNet\TShark;

use ReactNet\Filesystem\File\AbstractFile;

class Z extends AbstractFile
{
    public function convIp(): array
    {
        $ips = [];
        if ($file = fopen($this->filepath, 'r')) {
            while (!feof($file)) {
                $line = preg_replace('~[[:cntrl:]]~', '', fgets($file));
                if (strpos($line, '<->')) {
                    $exploded = explode('<->', preg_replace('!\s+!', ' ', trim($line)));
                    $srcIp = trim($exploded[0]);
                    $destIp = strtok(trim($exploded[1]), ' ');
                    !isset($ips[$srcIp]) ? $ips[$srcIp] = 1 : $ips[$srcIp]++;
                    !isset($ips[$destIp]) ? $ips[$destIp] = 1 : $ips[$destIp]++;
                }
            }
            fclose($file);
        }

        return $ips;
    }

    public function convIpv6(): array
    {
        return $this->convIp();
    }

    public function endpointsIpv6(): array
    {
        $endpoints = [];
        if ($file = fopen($this->filepath, 'r')) {
            while (!feof($file)) {
                $line = preg_replace('~[[:cntrl:]]~', '', fgets($file));
                $exploded = explode(' ', preg_replace('!\s+!', ' ', trim($line)));
                $isValidIp = filter_var($exploded[0], FILTER_VALIDATE_IP);
                if ($isValidIp) {
                    $endpoints[] = [
                        'ip' => $exploded[0],
                        'packets' => $exploded[1],
                        'bytes' => $exploded[2],
                        'tx_packets' => $exploded[3],
                        'tx_bytes' => $exploded[4],
                        'rx_packets' => $exploded[5],
                        'rx_bytes' => $exploded[6],
                    ];
                }
            }
            fclose($file);
        }

        return $endpoints;
    }

    public function ioPhs(): array
    {
        $protocols = [];
        if ($file = fopen($this->filepath, 'r')) {
            while (!feof($file)) {
                $line = preg_replace('~[[:cntrl:]]~', '', fgets($file));
                if (strpos($line, 'frame')) {
                    $exploded = explode(' ', preg_replace('!\s+!', ' ', trim($line)));
                    $a = explode(':', $exploded[1]); // frames
                    $b = explode(':', $exploded[2]); // bytes
                    $protocol = [
                        'name' => $exploded[0],
                        $a[0] => $a[1],
                        $b[0] => $b[1],
                        'level' => (strlen($line) - strlen(ltrim($line))) / 2,
                    ];
                    $protocols[] = $protocol;
                }
            }
            fclose($file);
        }

        return $this->buildTree($protocols);
    }

    private function buildTree(array $protocols)
    {
        for ($i = 0; $i < count($protocols); $i++) {
            for ($j = $i - 1; $j >= 0; $j--) {
                if ($protocols[$j]['level'] == $protocols[$i]['level'] - 1 ) {
                    $protocols[$i]['parent_name'] = $protocols[$j]['name'];
                    break;
                }
            }
        }

        return $protocols;
    }
}
