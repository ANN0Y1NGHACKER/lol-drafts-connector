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
function getInfo() {socket.emit('getInfo')}

function updateTextbox(e, id) { document.getElementById(id).value = e.value; }

function chooseLayout() {
	Toast.fire({
		title: 'COMING SOON'
	})

	socket.emit('tourneyCode');
}

function saveInfo() {
	let data = {
		team1: document.getElementById('team1_name').value,
		team2: document.getElementById('team2_name').value,
		event_logo: document.getElementById('logo_url').value,
		team1_logo: document.getElementById('team1_logo_url').value,
		team2_logo: document.getElementById('team2_logo_url').value,
		team1_color1: document.getElementById('team1_color1').value,
		team2_color1: document.getElementById('team2_color1').value,
		team1_color2: document.getElementById('team1_color2').value,
		team2_color2: document.getElementById('team2_color2').value
	}

	Toast.fire({
		title: 'INFO SAVED!'
	})
	socket.emit('extraInfo', data)
}

socket.on('setInfo', data => {
	document.getElementById('team1_name').value = data.team1;
	document.getElementById('team2_name').value = data.team2;
	document.getElementById('logo_url').value = data.event_logo;
	document.getElementById('team1_logo_url').value = data.team1_logo;
	document.getElementById('team2_logo_url').value = data.team2_logo;
	document.getElementById('team1_color1').value = data.team1_color1;
	document.getElementById('team2_color1').value = data.team2_color1;
	document.getElementById('team1_color2').value = data.team1_color2;
	document.getElementById('team2_color2').value = data.team2_color2;
});

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