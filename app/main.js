const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// global to not allow garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.setMenu(null);
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit(); // OS X keeps clients open
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow(); // OS X requested client re-opened window
  }
});
