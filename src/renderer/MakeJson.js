module.exports = {
  MakeJson: () => {
    const fs = require("fs");
    const path = require("path");
    const configFile = JSON.parse(
      fs.readFileSync(process.env.PORTABLE_EXECUTABLE_DIR + "\\config.json")
    );
    let localArray = [];

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
    getFiles(process.env.PORTABLE_EXECUTABLE_DIR + "\\").then((res) => {
      res.forEach((file) => {
        // Define file size
        const size = fs.statSync(file).size;

        // Define download url
        const url =
          configFile.url +
          file
            .replace(process.env.PORTABLE_EXECUTABLE_DIR + "\\", "")
            .replace(/\\/g, "/");

        // Add all files
        // If file should have a hash code, then it is considered special
        if (
          configFile.specialFiles.indexOf(
            file
              .replace(process.env.PORTABLE_EXECUTABLE_DIR + "\\", "")
              .replace(/\\/g, "/")
          ) > -1
        ) {
          const hash = require("crypto")
            .createHash("sha1")
            .update(fs.readFileSync(file))
            .digest("base64");
          file = localArray.push({ file, size, hash, url });
        } else {
          // else, file is not special
          file = localArray.push({ file, size, url });
        }

        // Remove files that should not be listed
        localArray.forEach((e, i) => {
          localArray = localArray.filter(
            ({ file }) => !file.includes(configFile.unlistedFiles[i])
          );
          e.file = e.file.replace(
            process.env.PORTABLE_EXECUTABLE_DIR + "\\",
            ""
          );
        });

        // Write JSON
        fs.writeFileSync(
          process.env.PORTABLE_EXECUTABLE_DIR + "\\gc-launcher.json",
          JSON.stringify(localArray)
        );
      });

      document.getElementById("LoaderContent").innerHTML = "JSON ready!";
    });
  },
};
