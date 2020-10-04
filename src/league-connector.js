const LCUConnector = require('lcu-connector');
const connector = new LCUConnector();
const requestPromise = require('request-promise');

const server = require('./server');

let connectFlag = true, champSelectStart = false, champSelect = false, champSelectEnd = false;
global.finalData = {
	team1: {
		player1: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player2: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player3: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player4: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player5: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		bans: ["", "", "", "", ""]
	},
	team2: {
		player1: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player2: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player3: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player4: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		player5: {
			summonerId: "",
			summonerName: "",
			champID: "",
			summonerSpellID: ["", ""],
			champSkinID: ""
		},
		bans: ["", "", "", "", ""]
	}
};

setTimeout(()=>{
	if (connectFlag) {
		console.log("  Could not connect to league client.");
		server.connectionUpdate("waiting");
	}
}, 5000)

connector.on('connect', async (data) => {
	console.log("  Client Connected!!!");
	server.connectionUpdate("connected");
	connectFlag = false;

	LCUData = data;
	const { username, password, address, port } = LCUData;
	setInterval(()=>{
		requestPromise({
			strictSSL: false,
			url: `https://${username}:${password}@${address}:${port}/lol-champ-select/v1/session`
		})
		.then(body => {
			const info = JSON.parse(body);
			if (info) {
				if (!champSelect) {
					champSelect = true;
					champSelectStart = true;
				}

				let team1 = [
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					["", "", "", "", ""]
				];

				let team2 = [
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					{"summonerID": "","champ": "","skinn": "","spell": ["", ""]},
					["", "", "", "", ""]
				];

				for (var i=0; i<info.myTeam.length; i++) {
					team1[i].summonerID = info.myTeam[i].summonerId;
					team1[i].champ = info.myTeam[i].championId;
					team1[i].skinn = info.myTeam[i].selectedSkinId;
					team1[i].spell = [info.myTeam[i].spell1Id, info.myTeam[i].spell2Id];
				}

				for (var i=0; i<info.theirTeam.length; i++) {
					team2[i].summonerID = info.theirTeam[i].summonerId;
					team2[i].champ = info.theirTeam[i].championId;
					team2[i].skinn = info.theirTeam[i].selectedSkinId;
					team2[i].spell = [info.theirTeam[i].spell1Id, info.theirTeam[i].spell2Id];
				}

				for (var i=0; i<info.bans.myTeamBans.length; i++) team1[5][i] = info.bans.myTeamBans[i];
				for (var i=0; i<info.bans.theirTeamBans.length; i++) team2[5][i] = info.bans.theirTeamBans[i];

				global.finalData = {
					actions: info.actions,
					timer: info.timer,
					team1: {
						player1: {
							summonerId: team1[0].summonerID,
							summonerName: "",
							champID: team1[0].champ,
							summonerSpellID: team1[0].spell,
							champSkinID: team1[0].skinn
						},
						player2: {
							summonerId: team1[1].summonerID,
							summonerName: "",
							champID: team1[1].champ,
							summonerSpellID: team1[1].spell,
							champSkinID: team1[1].skinn
						},
						player3: {
							summonerId: team1[2].summonerID,
							summonerName: "",
							champID: team1[2].champ,
							summonerSpellID: team1[2].spell,
							champSkinID: team1[2].skinn
						},
						player4: {
							summonerId: team1[3].summonerID,
							summonerName: "",
							champID: team1[3].champ,
							summonerSpellID: team1[3].spell,
							champSkinID: team1[3].skinn
						},
						player5: {
							summonerId: team1[4].summonerID,
							summonerName: "",
							champID: team1[4].champ,
							summonerSpellID: team1[4].spell,
							champSkinID: team1[4].skinn
						},
						bans: team1[5]
					},
					team2: {
						player1: {
							summonerId: team2[0].summonerID,
							summonerName: "",
							champID: team2[0].champ,
							summonerSpellID: team2[0].spell,
							champSkinID: team2[0].skinn
						},
						player2: {
							summonerId: team2[1].summonerID,
							summonerName: "",
							champID: team2[1].champ,
							summonerSpellID: team2[1].spell,
							champSkinID: team2[1].skinn
						},
						player3: {
							summonerId: team2[2].summonerID,
							summonerName: "",
							champID: team2[2].champ,
							summonerSpellID: team2[2].spell,
							champSkinID: team2[2].skinn
						},
						player4: {
							summonerId: team2[3].summonerID,
							summonerName: "",
							champID: team2[3].champ,
							summonerSpellID: team2[3].spell,
							champSkinID: team2[3].skinn
						},
						player5: {
							summonerId: team2[4].summonerID,
							summonerName: "",
							champID: team2[4].champ,
							summonerSpellID: team2[4].spell,
							champSkinID: team2[4].skinn
						},
						bans: team2[5]
					}
				};

				requestPromise({
					strictSSL: false,
					url: `https://${username}:${password}@${address}:${port}/lol-lobby/v2/lobby/members`
				})
				.then(body => {
					const info = JSON.parse(body);
					if (info) {
						for (var i in info) {
							// console.log(`${info[i].summonerId} - ${info[i].summonerName}`);
							if (info[i].teamId == 100) {
								for (var p in global.finalData.team1) {
									if (global.finalData.team1[p].summonerId == info[i].summonerId) global.finalData.team1[p].summonerName = info[i].summonerName
								}
							}
							else if (info[i].teamId == 200) {
								for (var p in global.finalData.team2) {
									if (global.finalData.team2[p].summonerId == info[i].summonerId) global.finalData.team2[p].summonerName = info[i].summonerName
								}
							}
						}

						// let sendData = {
						// 	"room": global.room,
						// 	"data": global.finalData
						// };
					}
				}).catch(() => {});
			}
				
		}).catch(() => {
			if (champSelect) champSelectEnd = true;
			champSelect = false;
		});

		if (champSelectStart) {
			console.log("  Champ Select Started.");
			server.connectionUpdate("champselect");
			champSelectStart = false;
		}

		if (champSelectEnd) {
			console.log("  Champ Select Ended.");
			server.connectionUpdate("connected");
			champSelectEnd = false;
		}
	}, 1000)
});

connector.on('disconnect', async (data) => {
	console.log("  Client Disconnected");
	server.connectionUpdate("disconnected");
})

connector.start();