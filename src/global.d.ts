export interface ElectronApi {
  createProject: (name: string) => Promise<any>
  loadProject: (name: string) => Promise<any>
  saveProject: (project: Project) => void
  deleteProject: (projectName: string) => void
  getAllProjects: () => Promise<string[]>
  getRecentProjectName: () => string
}

declare global {
  interface Window {
    electron: ElectronApi
  }
}
