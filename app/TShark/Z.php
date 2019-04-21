<?php

namespace ReactNet\TShark;

use ReactNet\Filesystem\File\AbstractFile;

class Z extends AbstractFile
{
    private $stats = [];

    public function ioPhs(): array
    {
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
                    $this->stats[] = $protocol;
                }
            }
            fclose($file);
        }

        return $this->stats;
    }
}
