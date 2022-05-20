# Electron Game Updater Helper

This app was developed as a helper tool for my [electron-game-updater](https://github.com/gustavokei/electron-game-updater)

![](https://i.imgur.com/9ohs6JO.gif)

A portable Windows app that:

- Generates an update list JSON file with data of all files within its directory
- Highly customizable

If you don't want to compile it, [download here](https://github.com/gustavokei/electron-game-updater-helper/releases)

## eguh-config.json example

- `url` = direct download url
- `specialFiles` = files that will have an [unique hash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options)
- `ignoredFiles` = files that won't be included in the output file (for files in a subdir, do `subdir/file`)
- `output` = name of the output file

```json
{
  "url": "https://cdn.grandchase.online/file/gc-client/s5/",
  "specialFiles": ["main.exe", "stage/script.kom", "stage/char_script.kom"],
  "ignoredFiles": [
    "Electron-Game-Updater-Helper.exe",
    "eguh-config.json",
    "eguh-update-list.json",
    "JoystickSettingVer2.dat",
    "KeySettingVer2.dat",
    "log.htm",
    "OptionVer2.dat",
    "ResoultionSettingVer3.dat"
  ],
  "output": "eguh-update-list.json"
}
```

## eguh-update-list.json example

```json
{
  "file": "main.exe",
  "size": 16637952,
  "hash": "kuc4HCv3bX7LCaRrloP4v2TjYpc=",
  "url": "https://storage.googleapis.com/gc-client/main.exe"
}
```
