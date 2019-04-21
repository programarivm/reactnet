<?php

namespace ReactNet\Filesystem\File;

use ReactNet\Exception\FileCharEncodingException;

abstract class AbstractFile
{
    protected $filepath;

    protected $line;

    public function __construct(string $filepath)
    {
        $content = file_get_contents($filepath);
        $encoding = mb_detect_encoding($content);

        if ($encoding !== 'ASCII' && $encoding !== 'UTF-8') {
            throw new FileCharEncodingException(
                "Character encoding detected: $encoding. Needs to be UTF-8."
            );
        }

        $this->filepath = $filepath;
        $this->line = new Line;
    }
}
