export interface Project {
  id: string
  name: string
  sections: Record<string, Section>
  sectionOrder: string[]
  color: string
}

export interface Section {
  name: string
  tasks: Task[]
  color: string
}

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  inProgress: boolean
}
