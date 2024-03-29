import { app, BrowserWindow } from "electron";
import * as path from "path";
import isDev from 'electron-is-dev';

let mainWindow:BrowserWindow;

function createWindow() {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
        show: false
    });

    if(isDev){
        mainWindow.loadURL("http://localhost:3000")
        mainWindow.on("ready-to-show", ()=>{
        mainWindow.show();
        mainWindow.webContents.openDevTools();
        })
    }else{
        mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
        mainWindow.on("ready-to-show", ()=>{
            mainWindow.show();
            mainWindow.webContents.openDevTools();
        })
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
