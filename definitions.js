const speed_definitions = [{
	name: "PCIe",
	overhead: 0.06,
	citations: ["https://en.wikipedia.org/wiki/PCI_Express"],
	versions: [
		{
			names: ["1.0"],
			speed: "2.5Gbit",
			duplex: "full",
			coding: "8b/10b",
		},
		{
			names: ["2.0"],
			speed: "5Gbit",
			duplex: "full",
			coding: "8b/10b",
		},
		{
			names: ["3.0"],
			speed: "8Gbit",
			duplex: "full",
			coding: "128b/130b",
		},
		{
			names: ["4.0"],
			speed: "16Gbit",
			duplex: "full",
			coding: "128b/130b",
		},
		{
			names: ["5.0"],
			speed: "32Gbit",
			duplex: "full",
			coding: "128b/130b",
		},
		{
			names: ["6.0"],
			speed: "64Gbit",
			duplex: "full",
			coding: "242b/256b",
		},
	],
	lanes: {
		counts: [1,2,4,8,16],
		overrides:[
			{},
			{},
			{},
			{},
			{}
	]},
},
{
	name: "USB",
	overhead: 0.13,
	citations: ["https://en.wikipedia.org/wiki/USB#2.0"],
	versions: [
		{
			names: ["Low-Speed", "Basic-Speed"],
			speed: "1.5Mbit",
			duplex: "half",
			throughput: "150kB"
		},
		{
			names: ["Full-Speed", "1.1", "1.0", "Basic-Speed"],
			speed: "12Mbit",
			duplex: "half",
			throughput: "1.2MB",
			citations: ["https://developerhelp.microchip.com/xwiki/bin/view/applications/usb/speeds-specs/full-speed/"],
		},
		{
			names: ["2.0", "High-speed"],
			speed: "480Mbit",
			duplex: "half",
			throughput: "53MB",
			citations: ["https://developerhelp.microchip.com/xwiki/bin/view/applications/usb/speeds-specs/high-speed/"],
		},
		{
			names: ["3.2 Gen 1"],
			speed: "5Gbit",
			duplex: "full",
			coding: "8b/10b",
			lanes: {
				counts: [1, 2],
				overrides: [{names: ["3.0", "SuperSpeed", "SS", "3.1 Gen 1", "3.2 Gen 1", "3.2 Gen 1x1", "USB 5Gbps" ]},{
					names: ["3.2 Gen 1×2", "USB 10Gbps"],
					coding: "128b/132b"
				}
				]
			}
		},
		{
			names: ["3.2 Gen 2"],
			speed: "10Gbit",
			duplex: "full",
			coding: "128b/132b",
			lanes: {
				counts: [1, 2],
				overrides: [{names: ["3.1 Gen 2", "SuperSpeed+", "SS+", "3.2 Gen 2","3.2 Gen 2x1", "USB 10Gbps" ]},{
					names: ["3.2 Gen 2×2", "USB 20Gbps"],
				}
				]
			}
		},

		{
			names: ["USB4 Gen 2"],
			speed: "10Gbit",
			duplex: "full",
			coding: "64b/66b",
			lanes: {
				counts: [1, 2],
				overrides: [{names: ["USB4 Gen 2x1", "USB 10Gbps" ]},{
					names: ["USB4 Gen 2×2", "USB 20Gbps"],
				}
				]
			}
		},
		{
			names: ["USB4 Gen 3"],
			speed: "20Gbit",
			duplex: "full",
			coding: "128b/132b",
			lanes: {
				counts: [1, 2],
				overrides: [{names: ["USB4 Gen 3x1", "USB 20Gbps" ]},{
					names: ["USB4 Gen 3×2", "USB 40Gbps"],
				}
				]
			}
		},
		{
			names: ["USB4 2.0", "USB4 Gen 4x2", "USB 80Gbps"],
			speed: "40Gbit",
			duplex: "full",
			coding: "128b/132b",
			lanes: { counts: [2], overrides: [{}]},
		}
	]
},
{
	name: "Ethernet",
	notes: "Throughput depends heavily on traffic framing (small, maximum, jumbo, etc), but is typically ~6% for TCPv4 and ~8% for TCPv6",
	overhead: 0.07,
	versions: [
		{
			names: ["10M", "10BASE-T"],
			speed: "10Mbit",
			duplex: "full",
			coding: false,
		},
		{
			names: ["100M", "100BASE-TX", "FE"],
			speed: "100Mbit",
			duplex: "full",
			coding: false,
		},
		{
			names: ["1G", "GE","1GBASE-T", "1000BASE-T"],
			speed: "1Gbit",
			duplex: "full",
			coding: false,
		},
		{
			names: ["2.5G", "2.5GbE", "2.5GBASE-T", "NBASE-T"],
			speed: "2.5Gbit",
			duplex: "full",
			coding: false,
		},
		{
			names: ["5G", "5GbE","5GBASE-T", "NBASE-T"],
			speed: "5Gbit",
			duplex: "full",
			coding: false,
		},
		{
			names: ["10G", "10GBASE-T", "10GbE"],
			speed: "10Gbit",
			duplex: "full",
			coding: false,
		},
	]
},
{
	name: "SATA",
	overhead: 0.07,
	versions: [
		{
			names: ["I", "1.5G"],
			speed: "1.5Gbit",
			duplex: "half",
			coding: "8b/10b",
		},
		{
			names: ["II", "3G"],
			speed: "3Gbit",
			duplex: "half",
			coding: "8b/10b",
		},
		{
			names: ["III", "6G"],
			speed: "6Gbit",
			duplex: "half",
			coding: "8b/10b",
		},
	]
}
]
