import path from 'path'
import fs from 'fs'
import { app } from 'electron'

interface WindowState {
  height: number
  width: number
  x?: number
  y?: number
  maximized: boolean
}

interface Config {
  windowState: WindowState
  recentProjectName?: string
  [key: string]: any
}

let config: Config = {
  windowState: {
    height: 600,
    width: 800,
    maximized: false,
  },
  recentProjectName: null,
}

const configPath = path.join(app.getPath('userData'), '/config')
const configFilePath = path.join(configPath, `config.json`)

export const loadConfig = () => {
  try {
    const data = fs.readFileSync(configFilePath, 'utf-8')
    const dataJSON = JSON.parse(data)
    config = dataJSON as Config
    return config
  } catch (error) {
    console.error(error)
    return config
  }
}

export const getConfig = () => {
  return config
}

export const saveConfig = () => {
  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath, { recursive: true })
  }

  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('Error saving config: ', error)
  }
}

export const saveWindowSize = (width: number, height: number) => {
  config.windowState.width = width
  config.windowState.height = height
  saveConfig()
}

export const saveWindowPosition = (x: number, y: number) => {
  config.windowState.x = x
  config.windowState.y = y
  saveConfig()
}

export const saveWindowMaximize = (maximized: boolean) => {
  config.windowState.maximized = maximized
  saveConfig()
}

export const saveRecentProjectName = (projectName: string) => {
  config.recentProjectName = projectName
  saveConfig()
}

export const getRecentProjectName = (): string | null => {
  return config.recentProjectName
}
