
const run_cmd = require('./run_cmd');

const path = require('path');
module.exports = {
	launch: function (secret, http_user, http_passwd) {
		var filepath = "";
		if (process.platform === 'win32' && process.arch === "x64") {
			filepath = path.join(__dirname, "bin/win64/aria2c.exe");
		}
		if (process.platform === 'win32' && process.arch === "ia32") {
			filepath = path.join(__dirname, "bin/win32/aria2c.exe");
		}
		if (process.platform === 'darwin') {
			filepath = path.join(__dirname, "bin/osx/aria2c");
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
		], function (text) { console.log(text) });
	},
	quit() {

		if (process.platform === 'win32') {
			run_cmd.execute("Taskkill", [
				"/IM","aria2","/F"
			], function (text) { console.log(text) });
		}
		else if (process.platform === 'darwin') {
			run_cmd.execute("pkill", [
				"aria2"
			], function (text) { console.log(text) });
		}

	}
}
