import React, {
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { useProjectStore } from '../../store/projectStore'
import { X } from 'react-feather'
import { motion } from 'framer-motion'
import { Errors, validateInput, ValidationRules } from '../../utils/validation'

interface Props {
  isFormOpen: boolean
  setFormOpen: Dispatch<SetStateAction<boolean>>
  setExistingProjects: React.Dispatch<React.SetStateAction<string[]>>
}

const NewProjectForm = ({ setExistingProjects, setFormOpen }: Props) => {
  const [projectName, setProjectName] = useState('')
  const setProject = useProjectStore((state) => state.setProject)

  const [errors, setErrors] = useState<Errors>({})
  const validationRules: ValidationRules = {
    projectName: {
      required: true,
      minLength: 3,
    },
  }

  const handleNewProject = async (event: SyntheticEvent) => {
    event.preventDefault()
    console.log('TEST')
    const error = validateInput(projectName, validationRules.projectName)
    if (error) {
      setErrors({ projectName: error })
      return
    }
    const newProject = await window.electron.createProject(projectName)
    setExistingProjects((prev) => prev.concat(projectName))
    setProject(newProject)
    setProjectName('')
    setFormOpen(false)
  }

  return (
    <motion.form
      onSubmit={handleNewProject}
      className='mt-4 flex flex-col items-center gap-y-2'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className='font-bold text-lg'>New Project</h1>
      <input
        value={projectName}
        placeholder='Project Name'
        onChange={({ target }) => setProjectName(target.value)}
        className='text-white relative mt-2 bg-slate-900 border border-slate-700 py-1 px-2 placeholder:text-neutral-300 rounded-md outline-none'
      />
      <p className='text-red-500 text-sm'>{errors.projectName}</p>
      <div className='flex gap-x-4'>
        <button type='button' onClick={() => setFormOpen(false)} className=''>
          <X />
        </button>
        <div className='w-20 bg-gradient-to-tr from-blue-400 to-blue-700 p-[1px] rounded-md shadow-black shadow-md'>
          <button
            type='submit'
            className='w-full bg-slate-900 text-blue-100 rounded-md p-2'
          >
            Create
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default NewProjectForm
