const {
	app,
	Menu,
	shell,
	remote,
	dialog,
	BrowserWindow
} = require('electron')
const path = require('path')
var mainWindow;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, './js/preload.js'),
			enableRemoteModule: true,
			nodeIntegration: true,
		}
	})
	mainWindow.loadFile('index.html')
	// mainWindow.webContents.openDevTools()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit()
});

let menuTemplate = [{
	label: '操作',
	submenu: [{
		label: '重新加载',
		accelerator: 'CmdOrCtrl+R',
		click: function(item, focusedWindow) {
			if (focusedWindow) {
				if (focusedWindow.id === 1) {
					BrowserWindow.getAllWindows().forEach(function(win) {
						if (win.id > 1) {
							win.close()
						}
					})
				}
				focusedWindow.reload()
			}
		}
	}]
}, {
	label: '窗口',
	role: 'window',
	submenu: [{
		label: '最小化',
		accelerator: 'CmdOrCtrl+M',
		role: 'minimize'
	}, {
		label: '关闭',
		accelerator: 'CmdOrCtrl+W',
		role: 'close'
	}, {
		type: 'separator'
	}]
}, {
	label: '帮助',
	role: 'help',
	submenu: [{
		label: '意见反馈',
		click: function() {
			// shell.openExternal('https://www.baidu.com');
			dialog.showMessageBox({
				type: 'info',
				title: '意见反馈',
				message: '刘乐乐亲情制作~~',
				buttons: ['哈哈']
			}).then((ret) => {});
		}
	}]
}];

var initApp = function() {
	const menu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(menu) // 设置菜单部分
	createWindow()
}


app.whenReady().then(initApp)
