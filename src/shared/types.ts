export interface Project {
  id: string
  name: string
  sections: Record<string, Section>
  sectionOrder: string[]
}

export interface Section {
  name: string
  tasks: Task[]
  color: string
}

export interface Task {
  id: string
  content: string
  completed: boolean
}
