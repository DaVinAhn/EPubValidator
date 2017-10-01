const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let main;

module.exports = {
  create(filePath, config) {
    const win = new BrowserWindow(config);
    win.loadURL(url.format({
      pathname: filePath,
      protocol: 'file:',
      slashes: true,
    }));
    return win;
  },

  getMain: () => main,

  loadMain() {
    const filePath = path.join(__dirname, '../../index.html');
    const win = this.create(filePath, {
      x: undefined,
      y: undefined,
      width: 600,
      minWidth: 600,
      height: 352,
      minHeight: 352,
      minimizable: true,
      maximizable: false,
      fullscreenable: false,
      show: false,
      frame: false,
      backgroundColor: '#1e2028',
    });
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      main = null;
    });
    win.once('ready-to-show', () => {
      win.show();
    });
    win.setContentProtection(true);

    main = win;
    return win;
  },
};
