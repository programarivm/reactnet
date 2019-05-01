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
    public function conv_ip()
    {
        $expected = [
            '192.168.1.1' => 1,
            '192.168.1.103' => 4,
            '93.184.220.113' => 1,
            '172.217.169.1' => 1,
            '216.58.213.4' => 1,
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_conv_ip.txt'))->convIpv6();

        $this->assertEquals($expected, $stats);
    }

    /**
     * @test
     */
    public function conv_ipv6()
    {
        $expected = [
            'fe79::12e0:67ff:fef2:df1c' => 6,
            'fe80::9f83:c0d8:823e:eeff' => 1,
            'ff02::1:ff3e:eeff' => 1,
            'ff02::1:ff00:b550' => 1,
            '2a01:4c8:80b:b513:1daf:abdf:7900:b550' => 1,
            'ff02::1:ffb8:b7fe' => 1,
            '2a02:4c6:70b:b515:fb98:f872:2fc8:b6fe' => 1,
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_conv_ipv6.txt'))->convIpv6();

        $this->assertEquals($expected, $stats);
    }

    /**
     * @test
     */
    public function endpoints_ip()
    {
        $expected = [
            [
                'ip' => '61.44.105.214',
                'packets' => 2227,
                'bytes' => 2216138,
                'tx_packets' => 1529,
                'tx_bytes' => 1997614,
                'rx_packets' => 698,
                'rx_bytes' => 218524,
            ],
            [
                'ip' => '192.168.1.103',
                'packets' => 2227,
                'bytes' => 2216138,
                'tx_packets' => 698,
                'tx_bytes' => 218524,
                'rx_packets' => 1529,
                'rx_bytes' => 1997614,
            ],
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_endpoints_ip.txt'))->endpointsIp();

        $this->assertEquals($expected, $stats);
    }

    /**
     * @test
     */
    public function endpoints_ipv6()
    {
        $expected = [
            [
                'ip' => '2a01:4c8:81d:589c:301a:8926:f9dd:c9f1',
                'packets' => 2,
                'bytes' => 220,
                'tx_packets' => 1,
                'tx_bytes' => 110,
                'rx_packets' => 1,
                'rx_bytes' => 110,
            ],
            [
                'ip' => '2001:67c:1560:8003::c8',
                'packets' => 2,
                'bytes' => 220,
                'tx_packets' => 1,
                'tx_bytes' => 110,
                'rx_packets' => 1,
                'rx_bytes' => 110,
            ],
            [
                'ip' => 'fe80::4ea:f3ff:fed7:c87c',
                'packets' => 2,
                'bytes' => 172,
                'tx_packets' => 1,
                'tx_bytes' => 86,
                'rx_packets' => 1,
                'rx_bytes' => 86,
            ],
            [
                'ip' => 'ff02::1:ffce:ef5a',
                'packets' => 1,
                'bytes' => 86,
                'tx_packets' => 0,
                'tx_bytes' => 0,
                'rx_packets' => 1,
                'rx_bytes' => 86,
            ],
            [
                'ip' => 'fe80::4917:ffbd:bace:ef5a',
                'packets' => 1,
                'bytes' => 86,
                'tx_packets' => 1,
                'tx_bytes' => 86,
                'rx_packets' => 0,
                'rx_bytes' => 0,
            ],
        ];

        $stats = (new TSharkZ(self::DATA_FOLDER.'/01_endpoints_ipv6.txt'))->endpointsIpv6();

        $this->assertEquals($expected, $stats);
    }

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
}
