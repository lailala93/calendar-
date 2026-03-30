const { app, BrowserWindow, nativeImage } = require("electron");

const path = require("node:path");
const bunnyIcon = path.join(__dirname, "../images", "bunny.ico");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1180,
    height: 860,
    minWidth: 1000,
    minHeight: 760,
    resizable: true,
    backgroundColor: "#f7f7fb",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: "Calendar",
    // titleBarStyle: "hidden",
    icon: bunnyIcon,
  });

  win.setMenuBarVisibility(false);
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
