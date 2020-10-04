const main = require('../main');
const request = require('request');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let connectionStatus = "waiting";
global.room = "";

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

io.on('connection', function(socket) {
	console.log(`  -> ${socket.id} connected`);
	socket.emit('update-status', connectionStatus);

	socket.on('setRoom', room => {
		global.room = room;
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

setInterval(() => {
	request.post('http://www.loldrafts.com/setPickData' +
		`?room=${global.room}` +

		`&team1_player1_name=${global.finalData.team1.player1.summonerName}` +
		`&team1_player2_name=${global.finalData.team1.player2.summonerName}` +
		`&team1_player3_name=${global.finalData.team1.player3.summonerName}` +
		`&team1_player4_name=${global.finalData.team1.player4.summonerName}` +
		`&team1_player5_name=${global.finalData.team1.player5.summonerName}` +
		`&team2_player1_name=${global.finalData.team2.player1.summonerName}` +
		`&team2_player2_name=${global.finalData.team2.player2.summonerName}` +
		`&team2_player3_name=${global.finalData.team2.player3.summonerName}` +
		`&team2_player4_name=${global.finalData.team2.player4.summonerName}` +
		`&team2_player5_name=${global.finalData.team2.player5.summonerName}` +

		`&team1_player1_champID=${global.finalData.team1.player1.champID}` +
		`&team1_player2_champID=${global.finalData.team1.player2.champID}` +
		`&team1_player3_champID=${global.finalData.team1.player3.champID}` +
		`&team1_player4_champID=${global.finalData.team1.player4.champID}` +
		`&team1_player5_champID=${global.finalData.team1.player5.champID}` +
		`&team2_player1_champID=${global.finalData.team2.player1.champID}` +
		`&team2_player2_champID=${global.finalData.team2.player2.champID}` +
		`&team2_player3_champID=${global.finalData.team2.player3.champID}` +
		`&team2_player4_champID=${global.finalData.team2.player4.champID}` +
		`&team2_player5_champID=${global.finalData.team2.player5.champID}` +

		`&team1_player1_summonerSpellID1=${global.finalData.team1.player1.summonerSpellID[0]}` +
		`&team1_player2_summonerSpellID1=${global.finalData.team1.player2.summonerSpellID[0]}` +
		`&team1_player3_summonerSpellID1=${global.finalData.team1.player3.summonerSpellID[0]}` +
		`&team1_player4_summonerSpellID1=${global.finalData.team1.player4.summonerSpellID[0]}` +
		`&team1_player5_summonerSpellID1=${global.finalData.team1.player5.summonerSpellID[0]}` +
		`&team2_player1_summonerSpellID1=${global.finalData.team2.player1.summonerSpellID[0]}` +
		`&team2_player2_summonerSpellID1=${global.finalData.team2.player2.summonerSpellID[0]}` +
		`&team2_player3_summonerSpellID1=${global.finalData.team2.player3.summonerSpellID[0]}` +
		`&team2_player4_summonerSpellID1=${global.finalData.team2.player4.summonerSpellID[0]}` +
		`&team2_player5_summonerSpellID1=${global.finalData.team2.player5.summonerSpellID[0]}` +

		`&team1_player1_summonerSpellID2=${global.finalData.team1.player1.summonerSpellID[1]}` +
		`&team1_player2_summonerSpellID2=${global.finalData.team1.player2.summonerSpellID[1]}` +
		`&team1_player3_summonerSpellID2=${global.finalData.team1.player3.summonerSpellID[1]}` +
		`&team1_player4_summonerSpellID2=${global.finalData.team1.player4.summonerSpellID[1]}` +
		`&team1_player5_summonerSpellID2=${global.finalData.team1.player5.summonerSpellID[1]}` +
		`&team2_player1_summonerSpellID2=${global.finalData.team2.player1.summonerSpellID[1]}` +
		`&team2_player2_summonerSpellID2=${global.finalData.team2.player2.summonerSpellID[1]}` +
		`&team2_player3_summonerSpellID2=${global.finalData.team2.player3.summonerSpellID[1]}` +
		`&team2_player4_summonerSpellID2=${global.finalData.team2.player4.summonerSpellID[1]}` +
		`&team2_player5_summonerSpellID2=${global.finalData.team2.player5.summonerSpellID[1]}` +

		`&team1_ban1=${global.finalData.team1.bans[0]}` +
		`&team1_ban2=${global.finalData.team1.bans[1]}` +
		`&team1_ban3=${global.finalData.team1.bans[2]}` +
		`&team1_ban4=${global.finalData.team1.bans[3]}` +
		`&team1_ban5=${global.finalData.team1.bans[4]}` +
		`&team2_ban1=${global.finalData.team2.bans[0]}` +
		`&team2_ban2=${global.finalData.team2.bans[1]}` +
		`&team2_ban3=${global.finalData.team2.bans[2]}` +
		`&team2_ban4=${global.finalData.team2.bans[3]}` +
		`&team2_ban5=${global.finalData.team2.bans[4]}`
	)
}, 1000);