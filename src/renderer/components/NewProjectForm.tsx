import React, {
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { useProjectStore } from '../store/projectStore'

interface Props {
  isFormOpen: boolean
  setFormOpen: Dispatch<SetStateAction<boolean>>
  setExistingProjects: React.Dispatch<React.SetStateAction<string[]>>
}

const NewProjectForm = ({
  setExistingProjects,
  isFormOpen,
  setFormOpen,
}: Props) => {
  const [newProjectName, setNewProjectName] = useState('')
  const setProject = useProjectStore((state) => state.setProject)

  const handleNewProject = async (event: SyntheticEvent) => {
    event.preventDefault()
    const newProject = await window.electron.createProject(newProjectName)
    setExistingProjects((prev) => prev.concat(newProjectName))
    setProject(newProject)
    setNewProjectName('')
    setFormOpen(false)
  }

  return (
    <div className='flex flex-col w-full justify-center items-center mt-4 transition-all'>
      <div className='flex items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-700 p-[1px] rounded-md shadow-black shadow-md'>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className='w-48 bg-slate-900 text-blue-100 rounded-md p-2'
        >
          Create New Project
        </button>
      </div>
      {isFormOpen && (
        <form onSubmit={handleNewProject} className='mt-4'>
          <input
            value={newProjectName}
            placeholder='Project Name'
            onChange={({ target }) => setNewProjectName(target.value)}
            className='text-white relative bg-slate-900 border border-slate-700 py-1 px-2 placeholder:text-neutral-300 rounded-md outline-none'
          />
          <button
            type='submit'
            className='mt-4 block mx-auto bg-slate-700 px-2 py-1 rounded-md border border-slate-600'
          >
            Add
          </button>
        </form>
      )}
    </div>
  )
}

export default NewProjectForm
