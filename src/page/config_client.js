try {
	var socket = io();
} catch (e) {}

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	timer: 2000,
	target: document.getElementById('app-container')
})

function closeConfig() {socket.emit('closeConfig')}