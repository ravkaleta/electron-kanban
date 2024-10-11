// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'
import { Project } from '../shared/types'

contextBridge.exposeInMainWorld('electron', {
  createProject: (name: string) => ipcRenderer.invoke('create-project', name),
  loadProject: (name: string) => ipcRenderer.invoke('load-project', name),
  saveProject: (project: Project) => ipcRenderer.send('save-project', project),
  deleteProject: (projectName: string) =>
    ipcRenderer.send('delete-project', projectName),
  getAllProjects: () => ipcRenderer.invoke('get-all-projects'),
  getRecentProjectName: () => ipcRenderer.invoke('get-recent-project'),
})
