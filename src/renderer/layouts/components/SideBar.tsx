import { useEffect, useState } from 'react'
import NewProjectForm from '../../components/NewProjectForm'
import ProjectList from '../../components/ProjectList'

const SideBar = () => {
  const [existingProjects, setExistingProjects] = useState<string[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await window.electron.getAllProjects()
      setExistingProjects(projects)
    }

    fetchProjects()
  }, [])

  return (
    <div className='bg-neutral-900 min-w-52 w-52 text-white border-neutral-600 border-r'>
      <NewProjectForm setExistingProjects={setExistingProjects} />
      <ProjectList
        existingProjects={existingProjects}
        setExistingProjects={setExistingProjects}
      />
    </div>
  )
}

export default SideBar
