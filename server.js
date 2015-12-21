// Requiring Dependecies
try {
	var connection = require('config/mysql_conn.js'),
		io = require('socket.io').listen(8080).sockets,
		mqtt = require('mqtt'),
		client = mqtt.connect("mqtt:api.noval-technologies.uk");
} catch () {
	console.log("Not all Dependecies were met, please check the Config script.");
}

// Alerting server start
console.log("Server started...");

// Listening for a new connection
io.on('connection', function(socket) {

	// Alerting a User has connected
	console.log("User: " + socket.id + " has Connected!");

	socket.on('control', function(res) {

		var user_id = res.user_id,
			channel_id = res.channel_id,
			socket_id = res.socket_id,
			pos = res.pos;

		console.log("ID: " + user_id + ", Channel: " + channel_id + ", socket: " + socket_id + ", pos: " + pos);

		// Checking the validity of the User
		connection.query("SELECT * FROM devices WHERE `device_owner` = ? AND `device_channel` = ?", [user_id, channel_id], function(err, res, field) {
			if (err) console.log(err);
			if (res.length < 1) {
				console.log("User verification failed");
			} else {
				console.log("User verified!");
				client.publish(channel_id, pos);
			}
		});
		
	});

	// Listening for disconnect
	socket.on('disconnect', function() {
		console.log("User: " + socket.id + " has Disconnected!");
	});

});