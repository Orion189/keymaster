import { app, BrowserWindow, ipcMain, nativeTheme, screen } from 'electron/main';
import * as path from 'path';

const __dirname = import.meta.dirname;

const createWindow = () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    const win = new BrowserWindow({
        minWidth: width,
        minHeight: height,
        show: false,
        //resizable: false,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    nativeTheme.addListener('updated', () => win.webContents.send('update-theme'));

    win.maximize();
    win.loadFile('./dist/index.html');
    win.show();
    //win.webContents.openDevTools(); // TODO: remove before release
};

ipcMain.handle('shouldUseDarkColors', () => nativeTheme.shouldUseDarkColors);

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
