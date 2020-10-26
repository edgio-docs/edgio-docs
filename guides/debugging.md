# Debugging

This guide shows you how to debug applications running locally behind the XDN.

## Visual Studio Code

To debug an XDN application in Visual Studio Code:

- open `.vscode/launch.json`
- Click "Add Configuration..." and select "Node.js: Launch Program"

Edit the resulting configuration to look like this:

```js
{
  "name": "Debug XDN App",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "autoAttachChildProcesses": true,
  "program": "${workspaceFolder}/node_modules/@xdn/cli",
  "args": ["run"]
}
```

The above assumes that the workspace folder is your app's root directory. If that is not the case, adjust `program` and `cwd` accordingly. The `program` config should always point to `@xdn/cli`. The `cwd` config should point to the root directory of your app.

Note that this configuration will allow you to set breakpoints in both your XDN router as well as your application code (for example in Next.js, Nuxt.js, Angular, etc...).
