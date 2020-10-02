try {
	var socket = io();
} catch (e) {}

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	timer: 2000,
	target: document.getElementById('app-container')
	// timerProgressBar: true,
})

function quitapp() {socket.emit('quit')}
function miniapp() {socket.emit('minimize')}

function openDiscord() {
	Toast.fire({
		icon: 'info',
		title: 'Coming Soon'
	})
}

socket.on('update-status', s => {
	let statIcon = document.getElementById('client-status');
	let statText = document.getElementById('status-text');

	statIcon.classList.remove("not");
	statIcon.classList.remove("active");
	statIcon.classList.remove("waiting");

	switch (s) {
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