<?php

namespace ReactNet\Filesystem;

class Dir
{
    public static function remove(string $path)
    {
        $files = glob($path . '/*');
        foreach ($files as $file) {
            is_dir($file) ? self::remove($file) : unlink($file);
        }

        !is_dir($path) ?: rmdir($path);
    }

    public static function make(string $path, int $mode, string $user)
    {
        if (!file_exists($path)) {
            if (mkdir($path, $mode)) {
                if (chown($path, $user)) {
                    return true;
                }
            }
        }

        return false;
    }
}
