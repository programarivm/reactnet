<?php

namespace ReactNet\TShark;

use ReactNet\Filesystem\File\AbstractFile;

class Stats extends AbstractFile
{
    private $stats = [];

    public function toArray(): string
    {
        if ($file = fopen($this->filepath, 'r')) {
            while (!feof($file)) {
                $line = preg_replace('~[[:cntrl:]]~', '', fgets($file));
                if ($this->line->startsWith($line, '===')) {
                    // TODO ...
                } elseif ($this->line->contains($line, 'frame')) {
                    // TODO ...
                }
            }
            fclose($file);
        }

        return $this->stats;
    }
}
