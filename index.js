/*jshint esversion: 6 */

const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

var ntnx = require('./ntnx');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
});

// handle Connect
ipcMain.on('ntnx:connect', (event, cluster, username, password) => {


 // set ntnx connection parameters
 ntnx_con.cluster = cluster;
 ntnx_con.username = username;
 ntnx_con.password = password;

 global.MainWin = mainWindow;

 ntnx.cluster_list();

 mainWindow.webContents.send('ntnx:connect:resp','send');

});
