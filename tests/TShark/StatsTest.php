<?php

namespace ReactNet\Tests\TShark;

use ReactNet\TShark\Stats as TSharkStats;
use PHPUnit\Framework\TestCase;

class StatsTest extends TestCase
{
    const DATA_FOLDER = __DIR__.'/data';

    /**
     * @test
     */
    public function to_array()
    {
        $stats = (new TSharkStats(self::DATA_FOLDER.'/01_sample.txt'))->toArray();

        $this->assertTrue(false);
    }
}
