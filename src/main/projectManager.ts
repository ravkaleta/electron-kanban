import path from 'path'
import fs from 'fs'
import { getRandomPreparedColor, getUniqueId } from '../shared/utils'
import { Project } from '../shared/types'
import { saveRecentProjectName } from './config'
import { app } from 'electron'

const projectsPath = path.join(app.getPath('userData'), '/projects')

export const getAllProjects = async (): Promise<string[]> => {
  if (fs.existsSync(projectsPath)) {
    const projects = await fs.promises.readdir(projectsPath)
    const projectsNames = projects.map((project) =>
      project.replace('.json', '')
    )
    return projectsNames
  }
  return []
}

export const createProject = async (name: string): Promise<Project> => {
  const firstSectionId = getUniqueId()

  const newProject: Project = {
    id: getUniqueId(),
    name,
    sections: {
      [firstSectionId]: {
        name: 'To do',
        tasks: [
          {
            id: getUniqueId(),
            title: 'First task',
            description: 'Description for first task',
            completed: false,
            inProgress: false,
          },
        ],
        color: getRandomPreparedColor(),
      },
    },
    sectionOrder: [firstSectionId],
    color: getRandomPreparedColor(),
  }

  if (!fs.existsSync(projectsPath)) {
    fs.mkdirSync(projectsPath, { recursive: true })
  }

  const filePath = path.join(projectsPath, `${name}.json`)

  try {
    await fs.promises.access(filePath)
    throw new Error('Project already exists')
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(newProject, null, 2))
    console.log('File created')
  } catch (error) {
    console.error(error)
    throw new Error('Failed creating new project: ' + error.message)
  }

  saveRecentProjectName(name)
  return newProject
}

export const loadProject = async (name: string): Promise<Project | null> => {
  const filePath = path.join(projectsPath, `${name}.json`)
  try {
    const project = await fs.promises.readFile(filePath, 'utf-8')
    const projectJSON = JSON.parse(project) as Project
    projectJSON.sections = projectJSON.sections || {}
    saveRecentProjectName(projectJSON.name)
    return projectJSON
  } catch (error) {
    console.error('Failed loading project: ' + error)
    saveRecentProjectName(undefined)
    return undefined
  }
}

export const saveProject = async (project: Project) => {
  const filePath = path.join(projectsPath, `${project.name}.json`)

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(project, null, 2))
    console.log('Project saved')
  } catch (error) {
    console.error(error)
    throw new Error('Failed saving project: ' + error.message)
  }
}

export const deleteProject = async (projectName: string) => {
  const filePath = path.join(projectsPath, `${projectName}.json`)

  try {
    await fs.promises.rm(filePath)
    console.log('Project deleted')
  } catch (error) {
    console.error(error)
    throw new Error('Failed deleting project')
  }
}
