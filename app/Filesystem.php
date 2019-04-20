<?php

namespace ReactNet;

class Filesystem
{
    public static function removeDir(string $path)
    {
        $files = glob($path . '/*');
        foreach ($files as $file) {
            is_dir($file) ? self::removeDir($file) : unlink($file);
        }

        rmdir($path);
    }

    public static function makeDir(string $path, int $mode, string $user)
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
