import { useEffect } from 'react'
import { useProjectStore } from './store/projectStore'
import MainLayout from './layouts/MainLayout'
import Navbar from './layouts/Navbar'

const App = () => {
  const setProject = useProjectStore((state) => state.setProject)
  // const saveProject = useProjectStore((state) => state.saveProject)

  useEffect(() => {
    const fetchRecentProject = async () => {
      const recentProjectName = await window.electron.getRecentProjectName()
      if (recentProjectName) {
        const project = await window.electron.loadProject(recentProjectName)
        if (project) {
          setProject(project)
        }
      }
    }

    fetchRecentProject()
  }, [])

  return (
    <div className='w-full h-full bg-slate-950 font-manrope text-black rounded-t-xl'>
      <Navbar />
      <MainLayout />
    </div>
  )
}

export default App
