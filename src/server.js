const main = require('../main');
const request = require('request');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const server_socket = require('socket.io-client')('https://loldrafts.com', {reconnect: true});

let connectionStatus = "waiting";
global.room = "";
global.champSelect = false;

global.eventInfo = {
	team1: "",
	team2: "",
	team1_logo: "",
	team2_logo: "",
	event_logo: "",
	team1_color: "",
	team2_color: ""
}

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

app.get('/popup.css', (req, res) => {
	res.sendFile(`${__dirname}/assets/popup.css`);
});


server_socket.on('connect', (socket) => { 
	console.log(`  -> connected to server`);
});

io.on('connection', function(socket) {
	console.log(`  -> ${socket.id} connected`);
	socket.join(server_socket.id);
	socket.emit('update-status', connectionStatus);

	socket.on('get-room', () => {
		global.room = server_socket.id;
		socket.emit('set-room', server_socket.id);
	})

	socket.on('extraInfo', data => {
		global.eventInfo = data;
	});

	socket.on('minimize', () => {
		main.minimize();
	});

	socket.on('openBrowser', (url) => {
		main.openInBrowser(url);
	});

	socket.on('openConfig', () => {
		main.openConfig();
	});

	socket.on('closeConfig', () => {
		io.emit('enable-config');
		main.closeConfig();
	});

	socket.on('quit', () => {
		server_socket.emit('deleteRoom', global.room);
		setTimeout(() => {main.quit()}, 100);
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

setInterval(() => {
	let finalData = {
		eventInfo: global.eventInfo,
		actions: global.finalData.actions,
		timer: global.finalData.timer,
		team1: global.finalData.team1,
		team2: global.finalData.team2
	}

	server_socket.emit('updateRoomInfo', global.room, finalData);
}, 1000);