let crc = require('crc');

module.exports.dispatch = function(crc_str, servers) {
	var index = Math.abs(crc.crc32(crc_str)) % servers.length;
	return servers[index];
};
