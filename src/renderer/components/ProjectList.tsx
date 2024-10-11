import { useProjectStore } from '../store/projectStore'

interface Props {
  existingProjects: string[]
  setExistingProjects: React.Dispatch<React.SetStateAction<string[]>>
}

const ProjectList = ({ existingProjects, setExistingProjects }: Props) => {
  const setProject = useProjectStore((state) => state.setProject)
  const resetProject = useProjectStore((state) => state.resetProject)
  const currentProjectName = useProjectStore((state) =>
    state.id ? state.name : undefined
  )

  const handleProjectLoad = async (projectName: string) => {
    const project = await window.electron.loadProject(projectName)
    setProject(project)
  }

  const handleProjectDelete = async (projectName: string) => {
    await window.electron.deleteProject(projectName)
    if (currentProjectName && currentProjectName === projectName) {
      resetProject()
    }
    setExistingProjects(existingProjects.filter((name) => name !== projectName))
  }

  return (
    <ul className='p-4'>
      {existingProjects.map((project) => (
        <li
          key={project}
          className='text-neutral-300 hover:bg-gradient-to-tr hover:from-white/20 border-b border-neutral-600 py-1 px-2'
        >
          <button
            onClick={() => handleProjectLoad(project)}
            className='w-10/12 text-start'
          >
            {project}
          </button>
          <button
            onClick={() => handleProjectDelete(project)}
            className='float-end mr-2'
          >
            X
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
