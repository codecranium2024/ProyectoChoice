const { contextBridge, ipcRenderer } = require('electron');

// Exponer API segura para la comunicación entre Ionic y Electron
contextBridge.exposeInMainWorld('electron', {
  setStore: (key, value) => ipcRenderer.sendSync('store-set', key, value),
  getStore: (key) => ipcRenderer.sendSync('store-get', key),
});
