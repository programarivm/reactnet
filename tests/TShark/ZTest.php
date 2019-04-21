<?php

namespace ReactNet\Tests\TShark;

use ReactNet\TShark\Z as TSharkZ;
use PHPUnit\Framework\TestCase;

class ZTest extends TestCase
{
    const DATA_FOLDER = __DIR__.'/data';

    /**
     * @test
     */
    public function io_phs()
    {
        $expected = [
            [
                'name' => 'eth',
                'frames' => 1000,
                'bytes' => 492855,
                'level' => 0,
            ],
            [
                'name' => 'ipv6',
                'frames' => 951,
                'bytes' => 487335,
                'level' => 1,
            ],
            [
                'name' => 'icmpv6',
                'frames' => 8,
                'bytes' => 680,
                'level' => 2,
            ],
            [
                'name' => 'tcp',
                'frames' => 943,
                'bytes' => 486655,
                'level' => 2,
            ],
            [
                'name' => 'http',
                'frames' => 14,
                'bytes' => 8233,
                'level' => 3,
            ],
            [
                'name' => 'data-text-lines',
                'frames' => 1,
                'bytes' => 470,
                'level' => 4,
            ],
            [
                'name' => 'ocsp',
                'frames' => 10,
                'bytes' => 6531,
                'level' => 4,
            ],
            [
                'name' => 'ssl',
                'frames' => 448,
                'bytes' => 412778,
                'level' => 3,
            ],
            [
                'name' => 'tcp.segments',
                'frames' => 229,
                'bytes' => 286780,
                'level' => 4,
            ],
            [
                'name' => 'ssl',
                'frames' => 206,
                'bytes' => 269318,
                'level' => 5,
            ],
            [
                'name' => 'ip',
                'frames' => 49,
                'bytes' => 5520,
                'level' => 1,
            ],
            [
                'name' => 'udp',
                'frames' => 46,
                'bytes' => 5318,
                'level' => 2,
            ],
            [
                'name' => 'dns',
                'frames' => 46,
                'bytes' => 5318,
                'level' => 3,
            ],
            [
                'name' => 'tcp',
                'frames' => 3,
                'bytes' => 202,
                'level' => 2,
            ],
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_io_phs.txt'))->ioPhs();

        $this->assertEquals($expected, $stats);
    }
}
