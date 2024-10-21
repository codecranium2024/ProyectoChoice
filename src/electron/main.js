const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const path = require('path');

// Crear una instancia de Electron Store
const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Cargar el archivo preload
      nodeIntegration: false, // Recomendado desactivado por seguridad
      contextIsolation: true, // Aislamiento de contexto
    }
  });

  mainWindow.loadURL('http://localhost:8100'); // Carga tu aplicación de Ionic

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Guardar datos en Electron Store
ipcMain.on('store-set', (event, key, value) => {
  store.set(key, value);
  event.returnValue = true;
});

// Obtener datos de Electron Store
ipcMain.on('store-get', (event, key) => {
  event.returnValue = store.get(key);
});

// Crear la ventana cuando la aplicación esté lista
app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
