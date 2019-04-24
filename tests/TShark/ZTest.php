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
                'parent_name' => 'eth',
            ],
            [
                'name' => 'icmpv6',
                'frames' => 8,
                'bytes' => 680,
                'level' => 2,
                'parent_name' => 'ipv6',
            ],
            [
                'name' => 'tcp',
                'frames' => 943,
                'bytes' => 486655,
                'level' => 2,
                'parent_name' => 'ipv6',
            ],
            [
                'name' => 'http',
                'frames' => 14,
                'bytes' => 8233,
                'level' => 3,
                'parent_name' => 'tcp',
            ],
            [
                'name' => 'data-text-lines',
                'frames' => 1,
                'bytes' => 470,
                'level' => 4,
                'parent_name' => 'http',
            ],
            [
                'name' => 'ocsp',
                'frames' => 10,
                'bytes' => 6531,
                'level' => 4,
                'parent_name' => 'http',
            ],
            [
                'name' => 'ssl',
                'frames' => 448,
                'bytes' => 412778,
                'level' => 3,
                'parent_name' => 'tcp',
            ],
            [
                'name' => 'tcp.segments',
                'frames' => 229,
                'bytes' => 286780,
                'level' => 4,
                'parent_name' => 'ssl',
            ],
            [
                'name' => 'ssl',
                'frames' => 206,
                'bytes' => 269318,
                'level' => 5,
                'parent_name' => 'tcp.segments',
            ],
            [
                'name' => 'ip',
                'frames' => 49,
                'bytes' => 5520,
                'level' => 1,
                'parent_name' => 'eth',
            ],
            [
                'name' => 'udp',
                'frames' => 46,
                'bytes' => 5318,
                'level' => 2,
                'parent_name' => 'ip',
            ],
            [
                'name' => 'dns',
                'frames' => 46,
                'bytes' => 5318,
                'level' => 3,
                'parent_name' => 'udp',
            ],
            [
                'name' => 'tcp',
                'frames' => 3,
                'bytes' => 202,
                'level' => 2,
                'parent_name' => 'ip',
            ],
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_io_phs.txt'))->ioPhs();

        $this->assertEquals($expected, $stats);
    }

    /**
     * @test
     */
    public function conv_ipv6()
    {
        $expected = [
            'src' => [
                'fe79::12e0:67ff:fef2:df1c',
                'fe79::12e0:67ff:fef2:df1c',
                'fe79::12e0:67ff:fef2:df1c',
                '2a01:4c8:80b:b513:1daf:abdf:7900:b550',
                'fe79::12e0:67ff:fef2:df1c',
                '2a02:4c6:70b:b515:fb98:f872:2fc8:b6fe',
            ],
            'dest' => [
                'fe80::9f83:c0d8:823e:eeff',
                'ff02::1:ff3e:eeff',
                'ff02::1:ff00:b550',
                'fe79::12e0:67ff:fef2:df1c',
                'ff02::1:ffb8:b7fe',
                'fe79::12e0:67ff:fef2:df1c',
            ],
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_conv_ipv6.txt'))->convIpv6();

        $this->assertEquals($expected, $stats);
    }

}
