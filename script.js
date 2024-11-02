const SI = {"k": 1, "K": 1, "M": 2, "G": 3, "T": 4};
const IEC = {"Ki": 1, "ki": 1, "Mi": 2, "Gi": 3, "Ti": 4};
const UNITS = {"b": 1, "B": 8, "bit": 1, "byte": 8};
// https://stackoverflow.com/a/67585914
function find_map_value(m, value) {
	for (const [k, v] of Object.entries(m)) {
		if (v === value) {
			return k;
		}
	}
	return undefined;
}
function soft_format(bits, si=false, bytes=true)
	{
		let value = Math.round(bits / (bytes ? 8 : 1));
		let div = si ? 1000.0 : 1024.0;
		let count = 0;
		while (value >= 995)
		{
			value /= div;
			count++;
		}
		if (value < 1.6)
			value = Math.round(value * 100) / 100;
		else if (value < 16)
			value = Math.round(value * 10) / 10;
		else
			value = Math.round(value);
		return value + find_map_value(si ? SI : IEC, count) + (bytes ? "B" : "bit");
	}
function ParsedSpeed(num, mult, unit)
{
	this.num = parseFloat(num);
	this.isBase2 = mult.includes("i");
	if (this.isBase2)
	{
		this.mult = IEC[mult];
		this.mults = find_map_value(IEC, IEC[mult]);
		this.base = 1024;
	}
	else
	{
		this.mult = SI[mult];
		this.mults = find_map_value(SI, SI[mult]);
		this.base = 1000;
	}
	this.unit = find_map_value(UNITS, UNITS[unit]);
	this.unit_mult = UNITS[unit];
	// All values up to 999TB are safe
	this.plain_bits = num * Math.pow(this.base, this.mult) * this.unit_mult;

	this.format = function(si=false, bytes=true, multiplier=1)
	{
		return soft_format(this.plain_bits * multiplier, si, bytes);
	}
}
function parse_speed(speed)
{
	let [_, num, mult, unit] = speed.match(/([\d.]+)([KkMGT]i?)(b|B|bit)p?s?/);
	return new ParsedSpeed(num, mult, unit);
}
function parse_coding(coding)
{

	let [_, num, denom] = coding.match(/(\d+)b\/(\d+)b/);
	return parseFloat(num) / parseFloat(denom);
}
function expand_definitions(defs)
{
	return defs.map(def => {
		let all_lanes = new Set();
		let mapped = {name: def.name, overhead: def.overhead, citations: def.citations};
		mapped.versions = def.versions.map(ver => {
			let version = {names: ver.names.map(x => x), speed: parse_speed(ver.speed), duplex: ver.duplex, coding: ver.coding, throughput: ver.throughput ? parse_speed(ver.throughput) : undefined, overhead: def.overhead};

			let ldef = { counts: [1], overrides: [{}]};
			if (ver.lanes)
			{
				ldef = ver.lanes;
			}
			else if (def.lanes)
				ldef = def.lanes;
			version.lanes = ldef.counts.map((ct,i) => {
				all_lanes.add(ct);
				let vlane = {lane_count: ct, ...version};
				vlane.names = [];
				for (const [key, value] of Object.entries(ldef.overrides[i]))
				{
					vlane[key] = value;
				}
				return vlane;
			});
			return version;
		});
		mapped.all_lanes = [...all_lanes];
		mapped.all_lanes.sort(function (a, b) {  return a - b;  });
		// re-position lanes for data
		mapped.versions.forEach(ver => {
			ver.lanes = mapped.all_lanes.map(ln => ver.lanes.find(x => x.lane_count == ln));
		})
		return mapped;
	})
}
const app = Vue.createApp({
	data() {
		return {
			mode: "bytes",
			mode_si: "iec",
			mode_overhead: "assumed",
			speed: null,
			show_names: false,
			speed_mult: 1,
			objects: expand_definitions(speed_definitions),
		}
	},
	methods: {
		testMethod() {
			return this.message + "!";
		},
		softFormat() {
			return this.speed === null ? "None" : soft_format(this.speed * this.speed_mult, this.mode_si == "si", this.mode == "bytes");
		},
		softFormatLane(lane) {
			return lane ? (lane.duplex!=="full" ? "*" :"") + soft_format(this.truespeed(lane), this.mode_si == "si", this.mode == "bytes") + "/s" : "";
		},
		toClasses(lane) {
			if (lane && this.speed)
			{
				const curspeed = this.truespeed(lane);
				if (curspeed < this.speed  * this.speed_mult * 0.97)
					return "insufficient_speed";
				else if (curspeed >= this.speed * this.speed_mult * 1.20)
					return "sufficient_speed";
				else
					return "edge_speed";
			}
			return "";
		},
		truespeed(lane) {
			if (lane)
			{
				let base = lane.speed.plain_bits * lane.lane_count;
				if (this.mode_overhead == "nominal")
					return base;
				if (lane.throughput)
					base = lane.throughput.plain_bits * lane.lane_count;
				else if (lane.coding === false)
					base = base; // Coding is already excluded
				else if (lane.coding)
					base *= parse_coding(lane.coding);
				if (this.mode_overhead == "coding")
					return base;
				return base *= (1-lane.overhead);
			}
			else
				return null;
		}
	}
})
app.mount('#app')
