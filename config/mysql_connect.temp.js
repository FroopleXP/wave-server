var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'HOST',
	user: 'USER',
	password: 'PASSWORD',
	database: 'DATABASE'
});

connection.connect(function(err) {
	if (err) console.log("Failed to connect to database.");
	if (!err) console.log("Sucessfully connected to database.");
	return;
});

module.exports = connection;