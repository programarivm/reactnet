<?php

namespace ReactNet\TShark;

use ReactNet\Filesystem\File\AbstractFile;

class Z extends AbstractFile
{
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
