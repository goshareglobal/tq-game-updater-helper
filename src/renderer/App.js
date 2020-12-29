import React from "react";
import "./App.css";

function App() {
  const { foo } = require("./patcher.js");
  const { ipcRenderer } = require("electron");
  ipcRenderer.on("call-foo", () => {
    foo();
  });

  return (
    <div id="LoaderWrapper">
      <div id="LoaderContent">Generating local JSON...</div>
    </div>
  );
}

export default App;
