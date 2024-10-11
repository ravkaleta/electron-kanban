import React, { useState, SyntheticEvent } from 'react'
import { useProjectStore } from '../store/projectStore'

interface Props {
  setExistingProjects: React.Dispatch<React.SetStateAction<string[]>>
}

const NewProjectForm = ({ setExistingProjects }: Props) => {
  const [newProjectName, setNewProjectName] = useState('')
  const setProject = useProjectStore((state) => state.setProject)

  const handleNewProject = async (event: SyntheticEvent) => {
    event.preventDefault()
    const newProject = await window.electron.createProject(newProjectName)
    setExistingProjects((prev) => prev.concat(newProjectName))
    setProject(newProject)
    setNewProjectName('')
  }

  return (
    <div className='pt-2 pb-4 px-4 border-b border-b-neutral-800'>
      <h2 className='text-center font-bold mb-2'>New Project</h2>
      <form onSubmit={handleNewProject} className='flex'>
        <input
          value={newProjectName}
          onChange={({ target }) => setNewProjectName(target.value)}
          className='text-white w-3/4 bg-neutral-800 border border-neutral-700 rounded-sm px-1 outline-none'
        />
        <button
          type='submit'
          className='px-2 bg-neutral-700 border-y border-r border-neutral-700'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default NewProjectForm
