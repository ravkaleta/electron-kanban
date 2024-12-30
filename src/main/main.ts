import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import {
  getConfig,
  getRecentProjectName,
  loadConfig,
  saveWindowMaximize,
  saveWindowPosition,
  saveWindowSize,
} from './config'
import {
  createProject,
  deleteProject,
  getAllProjects,
  loadProject,
  saveProject,
} from './projectManager'
import { Project } from '../shared/types'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  loadConfig()
  const config = getConfig()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: config.windowState.x,
    y: config.windowState.y,
    width: config.windowState.width,
    height: config.windowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
    frame: false,
    transparent: true,
  })

  mainWindow.on('resized', () => {
    const windowSize = mainWindow.getSize()
    saveWindowSize(windowSize[0], windowSize[1])
    saveWindowMaximize(false)
  })

  mainWindow.on('moved', () => {
    const position = mainWindow.getPosition()
    saveWindowPosition(position[0], position[1])
  })

  mainWindow.on('maximize', () => {
    saveWindowMaximize(true)
  })

  mainWindow.on('unmaximize', () => {
    saveWindowMaximize(false)
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }

  if (config.windowState.maximized) {
    mainWindow.maximize()
  }

  mainWindow.removeMenu()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // mainWindow.removeMenu
}

ipcMain.on('close-app', () => {
  console.log('CLOSE')
  app.quit()
})

ipcMain.on('minimize-app', () => {
  BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.on('maximize-app', () => {
  BrowserWindow.getFocusedWindow().maximize()
})

ipcMain.handle('create-project', async (event, name: string) => {
  try {
    return await createProject(name)
  } catch (error) {
    console.error(error)
  }
})

ipcMain.handle('load-project', async (event, name: string) => {
  try {
    return await loadProject(name)
  } catch (error) {
    console.error(error)
  }
})

ipcMain.on('save-project', async (event, project: Project) => {
  try {
    await saveProject(project)
  } catch (error) {
    console.error(error)
  }
})

ipcMain.on('delete-project', async (event, projectName: string) => {
  try {
    await deleteProject(projectName)
  } catch (error) {
    console.error(error)
  }
})

ipcMain.handle('get-all-projects', async () => {
  return await getAllProjects()
})

ipcMain.handle('get-recent-project', () => {
  return getRecentProjectName()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
