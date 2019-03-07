if (!!!losgoi) var losgoi = {};
losgoi.home = {

	/**
	 * Base URL
	 */
	url: "https://lineageos-on-ipfs.com/",

	/**
	 * Initializes the home page.
	 */
	init: function() {
		$.getJSON(losgoi.home.url + "ajax/devices.php", null, losgoi.home.show);
	},

	/**
	 * Display the list of devices using HoganJS.
	 * @param {JSON} json All the devices that are stored in the local IPFS node.
	 */
	show: function(json) {

		// Prepare
		for (let c = 0; c < json.length; c++) {
			json[c].size = losgoi.home.human_number(json[c].size);
		}

		// Encapsulate for Hogan.JS
		json = {
			devices: json
		};

		// Render
		$("#devices").html(templates.devices.render(json));
	},

	/**
	 * Outputs a human-readable string from a size in bytes.
	 * https://stackoverflow.com/a/20732091/5083247
	 * @param {number} size 
	 */
	human_number: function(size) {
		let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
	}
};
losgoi.home.init();

// Start IPFS
const node = new window.Ipfs();
node.on('ready', () => {});