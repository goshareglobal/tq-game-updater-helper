module.exports = {
  foo: () => {
    //
    // Files Arrays
    //
    let localArray = [];
    //

    //
    // 'getFiles' Function
    //
    const path = require("path");
    const getFiles = async (dir, fileList = []) => {
      const fs = require("fs").promises;
      const files = await fs.readdir(dir);
      for (const file of files) {
        const stat = await fs.stat(path.join(dir, file));
        if (stat.isDirectory())
          fileList = await getFiles(path.join(dir, file), fileList);
        else fileList.push(path.join(dir, file));
      }
      return fileList;
    };
    //

    //
    // Compare local/remote files
    //
    const { ipcRenderer } = require("electron");
    getFiles(process.env.PORTABLE_EXECUTABLE_DIR + "\\").then((res) => {
      res.forEach((file) => {
        const size = fs.statSync(file).size;
        const hash = require("crypto")
          .createHash("sha1")
          .update(fs.readFileSync(file))
          .digest("base64");
        const url =
          "https://storage.googleapis.com/gc-client/gc-client/" +
          file
            .replace(process.env.PORTABLE_EXECUTABLE_DIR + "\\", "")
            .replace(/\\/g, "/");
        file = localArray.push({ file, size, hash, url });

        localArray.forEach((e) => {
          e.file = e.file.replace(
            process.env.PORTABLE_EXECUTABLE_DIR + "\\",
            ""
          );
        });

        let valuesToRemove = [
          "Grand-Chase-Launcher-Helper.exe",
          "gc-launcher.json",
        ];
        localArray = localArray.filter((i) => !valuesToRemove.includes(i.file));

        fs.writeFileSync(
          process.env.PORTABLE_EXECUTABLE_DIR + "\\gc-launcher.json",
          JSON.stringify(localArray)
        );
      });

      console.log("localArray: " + JSON.stringify(localArray));

      // done
      document.getElementById("LoaderContent").innerHTML = "JSON ready!";
      // const remote = require("electron").remote;
      // var window = remote.getCurrentWindow();
      // window.close();
    });
    //

    //
    // Run Everything
    //
    const fs = require("fs");
    getFiles();
    //
  },
};
