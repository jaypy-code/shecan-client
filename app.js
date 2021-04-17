const { app, BrowserWindow } = require('electron')
const { join } = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 348,
        height: 756,
        resizable: false,
        fullscreen: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        title: 'Shecan'
    })

    win.setMenu(null)

    win.setIcon(join(__dirname, 'src/logo.png'))

    win.loadFile(join(__dirname, 'src/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})