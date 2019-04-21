<?php

namespace ReactNet\Filesystem\File;

class Line
{
    public function startsWith(string $haystack, string $needle): bool
    {
        return strcasecmp(substr($haystack, 0, strlen($needle)), $needle) === 0;
    }

    public function endsWith(string $haystack, string $needle): bool
    {
        return strcasecmp(substr($haystack, strlen($haystack) - strlen($needle)), $needle) === 0;
    }
}
