# A ElectronJS and ReactJS helper for [gustavokei/gc-launcher](https://github.com/gustavokei/gc-launcher)
This portable Windows app generates a JSON file with data of all files within its directory.

# output JSON
```javascript
{
  "file":string,
  "size":int,
  "url":string,
  "hash":string //optional
}
```

# egu-config JSON
```JSON
{
  "url": "download-url",
  "specialFiles": ["file.exe", "subdir/file.packed"],
  "unlistedFiles": ["Electron-Game-Updater-Helper.exe", "egu-config.json"],
  "output": "output.json"
}
```

# .env
```javascript
{
  "file":string,
  "size":int,
  "url":string,
  "hash":string //optional
}
```

# Preview
![app image](https://i.imgur.com/RaEw7x1.gif)
