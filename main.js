var bs = require('os');
var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortCut = require('global-shortcut');

var express = require('express')
,   app2 = express()
,   server = require('http').createServer(app2)
,   io = require('socket.io').listen(server)
,   conf = require('./config.json');

var mainWindow = null;

server.listen(conf.port);

app.on('window-all-closed', function() {
  // reset kiosk mode ...
  if (bs.platform() !== 'windows')
  {
    var exec = require('child_process').exec, child;
    cild = exec('taskkill /IM cafehook.exe /F',
      function(error, stdout, stderr) {
        alert(error);
      });
  }
  app.quit();
});

app.on('ready', function() {
  registerBlockShortCuts();

  mainWindow = new BrowserWindow({
    resizable: false,
    border: false,
    'auto-hide-menu-bar': true,
    'use-content-size': true,
    "node-integration": false,
    'kiosk': true,
    'web-preferences': { 'web-security': false }
  });

  //mainWindow.setFullScreen(true);
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.focus();

  // when Windows 7 run, eleminate some
  // shortcut's ...
  if (bs.platform() !== 'windows')
  {
    var exec = require('child_process').exec, child;
    cild = exec('/cafehook.exe',
      function(error, stdout, stderr) {

      });
  }

  io.sockets.on('connection', function (socket) {
    var zeit = null;
    var text = null;
  	// der Client ist verbunden
  	//socket.emit('screen_on');
  });



  mainWindow.openDevTools();
  mainWindow.webContents.on('will-navigate', function(event, url) {
    event.preventDefault();
    mainWindow.webContents.executeJavaScript('call_app("' + url + '");');
  });

  // require('shell').openExternal('http://electron.atom.io')
});

// Handles the registration of keys which should be kept from firing system commands.
function registerBlockShortCuts()
{
    // There's a better way to do this bit for now it probably doesn't matter.
    // Add key combinations here to block them.
    var blockedKeys = [
      'Esc',
      'Alt+F4',
      //'Alt+Tab',
      'Ctrl+Alt+Delete',
      // Extra keys which have potential to cause havoc on various systems.
      'Ctrl+Alt+T',
      'Ctrl+Alt+R',
      'Ctrl+Alt+0',
      'Ctrl+Alt+1',
      'Ctrl+Alt+2',
      'Ctrl+Alt+3',
      'Ctrl+Alt+4',
      'Ctrl+Alt+5',
      'Ctrl+Alt+6',
      'Ctrl+Alt+7',
      'Ctrl+Alt+8',
      'Ctrl+Alt+9',
    ];
    // Holds the registered shortcuts.
    var shortcuts = {};
    // Iterate through the blockedKeys array and register shortcuts for each key combo.
    for(var i = 0; i < blockedKeys.length; i++) {
      var keycombo = blockedKeys[i];
      // Store the registered combination.
      shortcuts[keycombo] = globalShortCut.register(keycombo, function() {
        // Block the key combo by doing nothing. Log any attempts to use the keys.
        console.log('User attempted to escape with a keyboard shortcut. Denied.');
      });
      // Log if the key combo failed to register.
      if(!shortcuts[keycombo]) {
        console.log('Failed to register key combo blocker for '+keycombo);
      }
    }
}
