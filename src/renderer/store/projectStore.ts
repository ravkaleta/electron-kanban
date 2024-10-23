import { create } from 'zustand'
import { Task, Project } from '../../shared/types'
import { getRandomPreparedColor, getUniqueId } from '../../shared/utils'
import { arrayMove } from '@dnd-kit/sortable'

export interface ProjectState extends Project {
  setProject: (project: Project) => void
  getProjectData: () => void
  changeProjectColor: (color: string) => void
  saveProject: () => void
  resetProject: () => void

  addSection: () => void
  deleteSection: (sectionId: string) => void
  changeSectionName: (sectionId: string, newSectionName: string) => void
  changeSectionColor: (sectionId: string, newColor: string) => void
  reorderSections: (newOrder: string[]) => void

  addTask: (task: Task, sectionId: string) => void
  deleteTask: (taskId: string, sectionId: string) => void
  completeTask: (taskId: string, sectionId: string) => void
  progressTask: (taskId: string, sectionId: string) => void
  reorderTasks: (
    sectionId: string,
    activeTaskId: string,
    overTaskId: string
  ) => void

  moveTaskToSection: (
    task: Task,
    currentSection: string,
    newSection: string
  ) => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  id: '',
  name: '',
  sections: {},
  sectionOrder: [],
  color: '',
  setProject: ({ id, name, sections, sectionOrder, color }: Project) => {
    set({ id, name, sections, sectionOrder, color })
  },
  getProjectData: () => {
    const { id, name, sections, sectionOrder } = get()
    return { id, name, sections, sectionOrder }
  },
  changeProjectColor: (color: string) => {
    set({ color })
  },
  resetProject: () => {
    set({
      id: '',
      name: '',
      sections: {},
      sectionOrder: [],
      color: '',
    })
  },
  saveProject: () => {
    const { id, name, sections, sectionOrder, color } = get()
    window.electron.saveProject({ id, name, sections, sectionOrder, color })
  },

  addSection: () => {
    const sectionId = getUniqueId()
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          name: 'New Section',
          tasks: [],
          color: getRandomPreparedColor(),
        },
      },
      sectionOrder: state.sectionOrder.concat(sectionId),
    }))
  },
  deleteSection: (sectionIdToDelete: string) => {
    set((state) => {
      const updatedSections = { ...state.sections }
      delete updatedSections[sectionIdToDelete]

      return {
        sections: updatedSections,
        sectionOrder: state.sectionOrder.filter(
          (sectionId) => sectionId !== sectionIdToDelete
        ),
      }
    })
  },
  changeSectionName: (sectionId: string, newSectionName: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          name: newSectionName,
        },
      },
    }))
  },
  changeSectionColor: (sectionId: string, newColor: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          color: newColor,
        },
      },
    }))
  },
  reorderSections: (newOrder: string[]) => {
    set(() => ({
      sectionOrder: newOrder,
    }))
  },

  addTask: (task: Task, sectionId: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          tasks: state.sections[sectionId].tasks.concat(task),
        },
      },
    }))
  },
  completeTask: (taskId: string, sectionId: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          tasks: state.sections[sectionId].tasks.map((task) =>
            task.id !== taskId
              ? task
              : { ...task, completed: !task.completed, inProgress: false }
          ),
        },
      },
    }))
  },
  progressTask: (taskId: string, sectionId: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          tasks: state.sections[sectionId].tasks.map((task) =>
            task.id !== taskId
              ? task
              : {
                  ...task,
                  inProgress: task.inProgress ? !task.inProgress : true,
                  completed: false,
                }
          ),
        },
      },
    }))
  },
  deleteTask: (taskId: string, sectionId: string) => {
    set((state) => ({
      sections: {
        ...state.sections,
        [sectionId]: {
          ...state.sections[sectionId],
          tasks: state.sections[sectionId].tasks.filter(
            (task) => task.id !== taskId
          ),
        },
      },
    }))
  },
  reorderTasks: (
    sectionId: string,
    activeTaskId: string,
    overTaskId: string
  ) => {
    set((state) => {
      const tasks = state.sections[sectionId].tasks

      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId)
      const overIndex = tasks.findIndex((t) => t.id === overTaskId)

      const newOrder = arrayMove(tasks, activeIndex, overIndex)

      return {
        sections: {
          ...state.sections,
          [sectionId]: {
            ...state.sections[sectionId],
            tasks: newOrder,
          },
        },
      }
    })
  },

  moveTaskToSection: (
    task: Task,
    currentSection: string,
    newSection: string
  ) => {
    set((state) => {
      return {
        sections: {
          ...state.sections,
          [currentSection]: {
            ...state.sections[currentSection],
            tasks: state.sections[currentSection].tasks.filter(
              (t) => t.id !== task.id
            ),
          },
          [newSection]: {
            ...state.sections[newSection],
            tasks: state.sections[newSection].tasks.concat(task),
          },
        },
      }
    })
  },
}))
