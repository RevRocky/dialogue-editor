import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import electronDl from 'electron-dl';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

electronDl();

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, '../electron/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.openDevTools(); // this is optional thing, use it if you see a devTool window opened
}

app.whenReady().then(() => {
    //additional logic here
}).then(createWindow)

app.on('window-all-closed', () => {
    // eslint-disable-next-line no-undef
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// This is also used for save for now.
// TODO: This might want to be changed once I separate
// file extensions. 
ipcMain.on('export', async (event, {payload})=> {
    // TODO: Get Default Path setup
    const destination = dialog.showSaveDialogSync();

    if (destination) {
        fs.writeFileSync(destination, payload.dialogue)
    }
})

ipcMain.on('open', async () => {
    const fileToOpen = dialog.showOpenDialogSync();
    console.log("Mrrp", fileToOpen)
    if (fileToOpen) {
        const contents = fs.readFileSync(fileToOpen[0], { encoding: 'utf8', flag: 'r' });

        mainWindow.webContents.send("file-opened", {
            graph: contents
        });

    }
})