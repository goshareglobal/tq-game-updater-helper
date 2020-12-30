# Electron Game Updater Helper
![](https://i.imgur.com/2fxPONJ.gif)

This portable Windows app is supposed to be used with [gustavokei/electron-game-updater](https://github.com/gustavokei/electron-game-updater)

[Icon](https://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiIjZmZmYTVjIiwiYm9yZGVyQ29sb3IiOiIjMjkyOTI5IiwiYm9yZGVyV2lkdGgiOiI0IiwiZXhwb3J0U2l6ZSI6IjI1NiIsImV4cG9ydGluZyI6ZmFsc2UsImZvbnRGYW1pbHkiOiJBcmlhbCIsImZvbnRQb3NpdGlvbiI6IjU5IiwiZm9udFNpemUiOiIyNiIsImZvbnRXZWlnaHQiOjYwMCwiaW1hZ2UiOiIiLCJpbWFnZU1hc2siOmZhbHNlLCJpbWFnZVNpemUiOjUwLCJzaGFwZSI6InNxdWFyZSIsInRleHQiOiJFR1VoIn0) made with [prefinem.com/simple-icon-generator](https://prefinem.com/simple-icon-generator/)

* Generates an update list JSON file (see egu-update-list.json) with data of all files within its directory
* Highly customizable (see egu-config.json)

## egu-config.json example

* `url` = direct download url
* `specialFiles` = files that will have an [unique hash](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options)
* `ignoredFiles` = files that won't be included in the output file (for files in a subdir, do `subdir/file`)
* `output` = name of the output file
```json
{
  "url": "https://storage.googleapis.com/gc-client/",
  "specialFiles": ["main.exe", "stage/script.kom", "stage/char_script.kom"],
  "ignoredFiles": [
    "Electron-Game-Updater-Helper.exe",
    "Electron Game Updater Helper.exe",
    "egu-config.json"
  ],
  "output": "egu-update-list.json"
}
```

## egu-update-list.json example
```json
{
  "file": "main.exe",
  "size": 16637952,
  "hash": "kuc4HCv3bX7LCaRrloP4v2TjYpc=",
  "url": "https://storage.googleapis.com/gc-client/gc-client/main.exe"
}
```
