const main = require('../main');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let connectionStatus = "waiting";

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/page/index.html`);
});

app.get('/style.css', (req, res) => {
	res.sendFile(`${__dirname}/page/style.css`);
});

app.get('/client.js', (req, res) => {
	res.sendFile(`${__dirname}/page/client.js`);
});

io.on('connection', function(socket) {
	console.log(`  -> ${socket.id} connected`);
	socket.emit('update-status', connectionStatus);

	socket.on('minimize', () => {
		main.minimize();
	});

	socket.on('quit', () => {
		main.quit();
	});
	
	socket.on('disconnect', () => {
		console.log(`  <- ${socket.id} disconnected`);
	});
});

http.listen(8999, () => {
	console.log(`Server listening on port: 8999`);
});

exports.connectionUpdate = (status) => {
	connectionStatus = status;
	io.emit('update-status', connectionStatus);
}