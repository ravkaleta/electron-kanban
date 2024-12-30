import { MutableRefObject, useEffect, useState } from 'react'
import NewProjectForm from '../../components/Project/NewProjectForm'
import ProjectList from '../../components/Project/ProjectList'
import ToggleButton from './ToggleButton'
import { motion } from 'framer-motion'

interface Props {
  mainContentRef?: MutableRefObject<HTMLDivElement>
}

const SideBar = ({ mainContentRef }: Props) => {
  const [existingProjects, setExistingProjects] = useState<string[]>([])
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [isProjectFormOpen, setProjectFormOpen] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await window.electron.getAllProjects()
      setExistingProjects(projects)
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (mainContentRef.current) {
      if (sideBarOpen) {
        mainContentRef.current.classList.add('rounded-l-3xl')
      } else {
        mainContentRef.current.classList.remove('rounded-l-3xl')
      }
    }
  }, [sideBarOpen, mainContentRef])

  return (
    <motion.div
      animate={{
        width: sideBarOpen ? 288 : 0,
      }}
      transition={{ duration: 0.1 }}
      className={`text-white flex-shrink-0`}
    >
      <div className='flex items-center absolute z-10'>
        <ToggleButton
          isOpen={sideBarOpen}
          setOpen={() => setSideBarOpen((prev) => !prev)}
        />
      </div>

      <motion.div
        animate={{ opacity: sideBarOpen ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className='mt-16'
      >
        <motion.div
          animate={{
            height: isProjectFormOpen ? 0 : 'auto',
            opacity: isProjectFormOpen ? 0 : 1,
          }}
          className='overflow-hidden px-4'
        >
          <ProjectList
            existingProjects={existingProjects}
            setExistingProjects={setExistingProjects}
          />
          <div className='mx-auto w-48 bg-gradient-to-tr from-blue-400 to-blue-700 p-[1px] rounded-md shadow-black shadow-md'>
            <button
              onClick={() => setProjectFormOpen((prev) => !prev)}
              className='w-full bg-slate-900 text-blue-100 rounded-md p-2'
            >
              Create New Project
            </button>
          </div>
        </motion.div>
        {isProjectFormOpen && (
          <NewProjectForm
            setExistingProjects={setExistingProjects}
            isFormOpen={isProjectFormOpen}
            setFormOpen={setProjectFormOpen}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default SideBar
