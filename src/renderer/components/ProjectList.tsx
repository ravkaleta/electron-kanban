import { List } from 'react-feather'
import { useProjectStore } from '../store/projectStore'
import NewProjectForm from './NewProjectForm'

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
    <ul className='w-full h-full bg-slate-900 rounded-lg p-4'>
      <div className='w-full flex items-center justify-center gap-x-2 mb-4'>
        <List size={24} />
        <h2 className='text-center text-lg'>Your Projects</h2>
      </div>
      {existingProjects.map((project) => (
        <li
          key={project}
          className={` ${
            project === currentProjectName
              ? 'bg-gradient-to-tr from-blue-500/20'
              : ''
          } text-white p-2 mt-1 first:mt-0 rounded-sm transition-all duration-300 border-b border-slate-800`}
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
