# Helper app for [gustavokei/electron-game-updater](https://github.com/gustavokei/electron-game-updater)
This portable Windows app generates a JSON file with data of all files within its directory.

[Icon](https://prefinem.com/simple-icon-generator/#eyJiYWNrZ3JvdW5kQ29sb3IiOiIjZmZmYTVjIiwiYm9yZGVyQ29sb3IiOiIjMjkyOTI5IiwiYm9yZGVyV2lkdGgiOiI0IiwiZXhwb3J0U2l6ZSI6IjI1NiIsImV4cG9ydGluZyI6ZmFsc2UsImZvbnRGYW1pbHkiOiJBcmlhbCIsImZvbnRQb3NpdGlvbiI6IjU5IiwiZm9udFNpemUiOiIyNiIsImZvbnRXZWlnaHQiOjYwMCwiaW1hZ2UiOiIiLCJpbWFnZU1hc2siOmZhbHNlLCJpbWFnZVNpemUiOjUwLCJzaGFwZSI6InNxdWFyZSIsInRleHQiOiJFR1VoIn0)

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
