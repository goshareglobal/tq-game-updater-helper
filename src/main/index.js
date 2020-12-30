"use strict";
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 340,
    height: 100,
    transparent: true,
    frame: true,
    fullscreenable: false,
    maximizable: false,
    resizable: false,
  });

  let url;

  url = formatUrl({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true,
  });

  window.on("error", (error) => {
    console.error({
      error,
    });
  });

  window.on("closed", () => {
    mainWindow = null;
  });

  window.loadURL(url);

  return window;
}

function runApp() {
  mainWindow = createMainWindow();

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("MakeJson");
  });
}

app.on("ready", () => {
  runApp();
});

if (module.hot) {
  module.hot.accept();
}
