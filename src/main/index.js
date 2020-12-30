"use strict";
import env from "common/env";
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

  if (env.isDevelopment) {
    url = `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`;
    window.webContents.openDevTools();
    window.webContents.on("devtools-opened", () => {
      setImmediate(() => {
        window.focus();
      });
    });
  } else {
    url = formatUrl({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    });
  }

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
