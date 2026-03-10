const { app, BrowserWindow, nativeImage } = require("electron");

const path = require("node:path");
const bunnyIcon = path.join(
  __dirname,
  "images",
  "transparant-bunny.18f91144.png",
);
const createWindow = () => {
  const win = new BrowserWindow({
    minHeight: 1000,
    minWidth: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    title: "Calendar",
    titleBarStyle: "customButtonsOnHover",
    titleBarOverlay: {
      color: "#3a3cbb",
      symbolColor: "#544d6f",
      height: 60,
    },
    icon: bunnyIcon,
  });

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
