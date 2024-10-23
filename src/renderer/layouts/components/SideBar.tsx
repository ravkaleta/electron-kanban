import { MutableRefObject, useEffect, useState } from 'react'
import NewProjectForm from '../../components/NewProjectForm'
import ProjectList from '../../components/ProjectList'
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
        {sideBarOpen && (
          <h1 className='text-blue-500 font-extrabold text-xl'>LOGO APKI</h1>
        )}
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
        </motion.div>
        <NewProjectForm
          setExistingProjects={setExistingProjects}
          isFormOpen={isProjectFormOpen}
          setFormOpen={setProjectFormOpen}
        />
      </motion.div>
    </motion.div>
  )
}

export default SideBar
