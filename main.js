const {app, BrowserWindow} = require('electron');

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 600,
		height: 400,
		webPreferences: {
			nodeIntegration: true
		},
		transparent: true, 
		frame: false,
		resizable: false,
		icon: `${__dirname}/src/assets/icon.ico`
		// backgroundColor: '#202020'
	})

	global.mainWindow = mainWindow;

	// mainWindow.loadURL('http://localhost:8999/');
	mainWindow.loadFile('./src/loading.html');
	mainWindow.setMenu(null);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

require('./src/server');
require('./src/league-connector')

setTimeout(() => {
	global.mainWindow.loadURL('http://localhost:8999/');
}, 3000);

exports.quit = () => {
	app.quit();
}

exports.minimize = () => {
	global.mainWindow.minimize();
}