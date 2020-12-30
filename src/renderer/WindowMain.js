import React from "react";
import "./WindowMain.css";

function WindowMain() {
  const { MakeJson } = require("./MakeJson.js");
  const { ipcRenderer } = require("electron");
  ipcRenderer.on("MakeJson", () => {
    MakeJson();
  });

  return (
    <div id="LoaderWrapper">
      <div id="LoaderContent">Generating JSON...</div>
    </div>
  );
}

export default WindowMain;
