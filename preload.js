const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  loadConfig: () => ipcRenderer.invoke('config:load'),
  saveConfig: (config) => ipcRenderer.invoke('config:save', config),
  invokeButton: (id, action = '') => ipcRenderer.invoke('button:invoke', id, action),
  killButton: (id) => ipcRenderer.invoke('button:kill', id),
  sendScriptInput: (id, text) => ipcRenderer.invoke('button:input', id, text),
  selectBatFile: () => ipcRenderer.invoke('file:select-bat'),
  openDataFolder: () => ipcRenderer.invoke('app:open-data-folder'),
  onButtonStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('button:status', listener);
    return () => ipcRenderer.removeListener('button:status', listener);
  },
  onScriptOutput: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('button:output', listener);
    return () => ipcRenderer.removeListener('button:output', listener);
  },
  listServices: () => ipcRenderer.invoke('service:list'),
  listWindowsServices: () => ipcRenderer.invoke('winservice:catalog'),
  getWindowsServiceStates: () => ipcRenderer.invoke('winservice:states'),
  controlWindowsService: (name, action) => ipcRenderer.invoke('winservice:control', name, action),
  onWindowsServiceStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('winservice:status', listener);
    return () => ipcRenderer.removeListener('winservice:status', listener);
  },
  onServiceStatus: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on('service:status', listener);
    return () => ipcRenderer.removeListener('service:status', listener);
  }
});
