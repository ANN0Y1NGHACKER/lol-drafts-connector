try {
	var socket = io();
} catch (e) {}

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	timer: 2000,
	target: document.getElementById('app-container')
})

function quitapp() {socket.emit('quit')}
function miniapp() {socket.emit('minimize')}
function openConfig(e) {
	socket.emit('openConfig');
	e.disabled = true;
}

function openDiscord() {
	Swal.fire({
		icon: 'info',
		title: 'COMING SOON',
		showConfirmButton: false,
		timer: 1000
	})
}

function chooseLayout() {
	Swal.fire({
		icon: 'info',
		title: 'COMING SOON',
		showConfirmButton: false,
		timer: 1000
	})
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