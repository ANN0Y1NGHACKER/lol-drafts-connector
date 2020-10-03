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
		icon: `${__dirname}/src/assets/icon.ico`,
		maximizable: false
	});

	global.mainWindow = mainWindow;

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


exports.openConfig = () => {
	// let pos = global.mainWindow.getBounds();
	const configMenu = new BrowserWindow({
		// x: pos.x + pos.width + 20,
		// y: pos.y,
		width: 400,
		height: 550,
		webPreferences: {
			nodeIntegration: true
		},
		parent: mainWindow,
		transparent: true, 
		frame: false,
		resizable: false,
		icon: `${__dirname}/src/assets/icon.ico`,
		maximizable: false
	});
	
	global.configMenu = configMenu;

	configMenu.loadURL('http://localhost:8999/config');
	configMenu.setMenu(null);
}

exports.closeConfig = () => {
	global.configMenu.close();
}

exports.minimize = () => {
	global.mainWindow.minimize();
}

exports.quit = () => {
	app.quit();
}