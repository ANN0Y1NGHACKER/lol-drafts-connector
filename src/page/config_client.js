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

function closeConfig() {socket.emit('closeConfig')}

function updateTextbox(e, id) { document.getElementById(id).value = e.value; }

function chooseLayout() {
	Toast.fire({
		title: 'COMING SOON'
	})
}

function saveInfo() {
	let data = {
		team1: document.getElementById('team1_name').value,
		team2: document.getElementById('team2_name').value,
		event_logo: document.getElementById('logo_url').value,
		team1_logo: document.getElementById('team1_logo_url').value,
		team2_logo: document.getElementById('team2_logo_url').value,
		team1_color: document.getElementById('team1_color').value,
		team2_color: document.getElementById('team2_color').value
	}

	Toast.fire({
		title: 'INFO SAVED!'
	})
	socket.emit('extraInfo', data)
}

function uploadLogo(ele, disp, inp) {
	const image = ele.files[0];

	if (image) {
		document.getElementById(disp).value = image.name;
		var FR= new FileReader();
		FR.onload = function(e) {
			document.getElementById(inp).value = e.target.result;
		};       
		FR.readAsDataURL( image );
	}

}