module.exports = {
  foo: () => {
    const fs = require("fs");
    let localArray = [];

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
    // Generate JSON
    //
    getFiles(process.env.PORTABLE_EXECUTABLE_DIR + "\\").then((res) => {
      res.forEach((file) => {
        const size = fs.statSync(file).size;
        const url =
          "https://storage.googleapis.com/gc-client/gc-client/" +
          file
            .replace(process.env.PORTABLE_EXECUTABLE_DIR + "\\", "")
            .replace(/\\/g, "/");

        const specialFiles = ["main.exe"];
        if (specialFiles.some((v) => file.includes(v))) {
          const hash = require("crypto")
            .createHash("sha1")
            .update(fs.readFileSync(file))
            .digest("base64");

          file = localArray.push({ file, size, hash, url });
        } else {
          file = localArray.push({ file, size, url });
        }

        const valuesToRemove = [
          "Grand-Chase-Launcher-Helper",
          "gc-launcher.json",
        ];
        localArray.forEach((e, i) => {
          localArray = localArray.filter(
            ({ file }) => !file.includes(valuesToRemove[i])
          );
          e.file = e.file.replace(
            process.env.PORTABLE_EXECUTABLE_DIR + "\\",
            ""
          );
        });

        fs.writeFileSync(
          process.env.PORTABLE_EXECUTABLE_DIR + "\\gc-launcher.json",
          JSON.stringify(localArray)
        );
      });

      // Done
      document.getElementById("LoaderContent").innerHTML = "JSON ready!";
    });
    //
  },
};
