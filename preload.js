// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('shouldUseDarkColors', () => ipcRenderer.invoke('shouldUseDarkColors'));
contextBridge.exposeInMainWorld('electron', {
    onUpdateTheme: (callback) => ipcRenderer.on('update', callback)
});

