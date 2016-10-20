(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

const run_cmd = require('./run_cmd');
const path = require('path');
module.exports = {
	launch: function (secret, http_user, http_passwd) {

		var filepath = "";
		if (env.name !== 'production') {
			if (process.platform === 'win32' && process.arch === "x64") {
				filepath = path.join(__dirname, "bin/win64/aria2c.exe");
			}
			if (process.platform === 'win32' && process.arch === "ia32") {
				filepath = path.join(__dirname, "bin/win32/aria2c.exe");
			}
			if (process.platform === 'darwin') {
				filepath = path.join(__dirname, "bin/osx/aria2c");
			}
		} else {
			if (process.platform === 'win32' && process.arch === "x64") {
				filepath = path.join(process.resourcesPath, "app/bin/win64/aria2c.exe");
			}
			if (process.platform === 'win32' && process.arch === "ia32") {
				filepath = path.join(process.resourcesPath, "app/bin/win32/aria2c.exe");
			}
			if (process.platform === 'darwin') {
				filepath = path.join(process.resourcesPath, "app/bin/osx/aria2c");
			}
		}
		// if (isDevelopment) {
		// 	filepath = path.join(__dirname, "myscripts/myscript1.sh");
		// } else {
		// 	filepath = path.join(process.resourcesPath, "app/myfolder/subfolder/myscripts/myscript1.sh");
		// }

		run_cmd.execute(filepath, [
			"--enable-rpc",
			"--rpc-listen-all",
			//"--rpc-secret=" + secret,
			//"--http-user=" + http_user,
			//"--http-passwd=" + http_passwd,
			//"--daemon"
		], function (text) { console.log(text); });
	},
	quit() {

		if (process.platform === 'win32') {
			run_cmd.execute("Taskkill", [
				"/IM", "aria2", "/F"
			], function (text) { console.log(text); });
		}
		else if (process.platform === 'darwin') {
			run_cmd.execute("pkill", [
				"aria2"
			], function (text) { console.log(text); });
		}

	}
};

}());
//# sourceMappingURL=aria2.js.map