const main = require('../main');
const request = require('request-promise');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let connectionStatus = "waiting";

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/page/index.html`);
});

app.get('/config', (req, res) => {
	res.sendFile(`${__dirname}/page/config.html`);
});

app.get('/style.css', (req, res) => {
	res.sendFile(`${__dirname}/page/style.css`);
});

app.get('/client.js', (req, res) => {
	res.sendFile(`${__dirname}/page/client.js`);
});

app.get('/config_client.js', (req, res) => {
	res.sendFile(`${__dirname}/page/config_client.js`);
});

app.get('/icon.png', (req, res) => {
	res.sendFile(`${__dirname}/assets/icon.png`);
});

io.on('connection', function(socket) {
	console.log(`  -> ${socket.id} connected`);
	socket.emit('update-status', connectionStatus);

	socket.on('minimize', () => {
		main.minimize();
	});

	socket.on('openConfig', () => {
		main.openConfig();
	});

	socket.on('closeConfig', () => {
		io.emit('enable-config');
		main.closeConfig();
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