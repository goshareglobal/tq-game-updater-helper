const { config } = require("process");

module.exports = {
  MakeJson: () => {
    const fs = require("fs");
    const path = require("path");

    // Change window text
    const showText = (text) => {
      document.getElementById("LoaderContent").innerHTML = text;
    };

    // Output error
    const alertError = (e) => {
      showText("Error");
      alert(e);
    };

    // Portable Executable Directory
    const exeDir = process.env.PORTABLE_EXECUTABLE_DIR + "\\";

    // Get config.json file
    let configFile;
    try {
      configFile = JSON.parse(fs.readFileSync(exeDir + "egu-config.json"));
    } catch (e) {
      alertError(e);
    }

    // Define local files array
    let localFiles = [];

    // Returns files list and takes the directory path as parameter
    const getFiles = async (dir, filesList = []) => {
      const fs = require("fs").promises;
      const files = await fs.readdir(dir);
      for (const file of files) {
        const stat = await fs.stat(path.join(dir, file));
        if (stat.isDirectory())
          filesList = await getFiles(path.join(dir, file), filesList);
        else filesList.push(path.join(dir, file));
      }
      return filesList;
    };

    // Main function
    try {
      getFiles(exeDir).then((res) => {
        res.forEach((file) => {
          // Define file size
          const size = fs.statSync(file).size;

          // Define download url
          const url =
            configFile.url + file.replace(exeDir, "").replace(/\\/g, "/");

          // Add all files
          // If file should have a hash code, then it is considered special
          if (
            configFile.specialFiles.indexOf(
              file.replace(exeDir, "").replace(/\\/g, "/")
            ) > -1
          ) {
            const hash = require("crypto")
              .createHash("sha1")
              .update(fs.readFileSync(file))
              .digest("base64");
            file = localFiles.push({ file, size, hash, url });
          } else {
            // else file is not special
            file = localFiles.push({ file, size, url });
          }

          // Rename files
          localFiles.forEach((e) => {
            e.file = e.file.replace(exeDir, "");
          });

          // Remove files that should not be listed
          localFiles = localFiles.filter(
            (item) =>
              !configFile.ignoredFiles.includes(item.file.replace(/\\/g, "/"))
          );

          // Write JSON
          fs.writeFileSync(
            exeDir + configFile.output,
            JSON.stringify(localFiles)
          );

          showText("JSON ready");
        });
      });
    } catch (e) {
      alertError(e);
    }
  },
};
