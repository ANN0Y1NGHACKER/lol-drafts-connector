try {
	var socket = io();
} catch (e) {}

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	target: document.getElementById('app-container'),
	position: 'bottom',
	timer: 1000
})

var room;

function copyLink() {
	let copyText = document.getElementById('overlay-url');
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand("copy");
	copyText.blur();

	Toast.fire({
		title: 'Copied Text'
	})
}
function openRoom() {socket.emit('openBrowser', document.getElementById('overlay-url').value, "_blank")}

function quitapp() {socket.emit('quit')}
function miniapp() {socket.emit('minimize')}
function openConfig(e) {
	socket.emit('openConfig');
	e.disabled = true;
}

function openDiscord() {
	Toast.fire({
		title: 'COMING SOON'
	})
}

function chooseLayout() {
	Toast.fire({
		title: 'COMING SOON'
	})
}

function getRoom() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.response);

			if (res[0] == "SUCCESS") {
				document.getElementById('overlay-url').value = `http://www.loldrafts.com/pick?room=${res[1]}`;
				room = res[1];
				socket.emit('setRoom', room)
			}
		}
	};
	xhttp.open("POST", "http://www.loldrafts.com/makeRoom", true);
	xhttp.send();
}

socket.on('enable-config', () => {document.getElementById('config-btn').disabled = false});

socket.on('update-status', s => {
	let statIcon = document.getElementById('client-status');
	let statText = document.getElementById('status-text');

	statIcon.classList.remove("not");
	statIcon.classList.remove("active");
	statIcon.classList.remove("waiting");

	switch (s) {
		case "champselect":
			statIcon.classList.add("active");
			statText.innerHTML = "Client Connected - In Champ Select";
			break;

		case "connected":
			statIcon.classList.add("active");
			statText.innerHTML = "Client Connected";
			break;

		case "disconnected":
			statIcon.classList.add("not");
			statText.innerHTML = "Client Disconnected";
			break;

		case "waiting":
			statIcon.classList.add("waiting");
			statText.innerHTML = "Waiting for client";
			break;
	
		default:
			break;
	}
});