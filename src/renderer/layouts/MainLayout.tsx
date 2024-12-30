import Project from '../components/Project/Project'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import { useRef } from 'react'

const MainLayout = () => {
  const mainContentRef = useRef(null)

  return (
    <div className='min-w-full min-h-[calc(100vh-33px)] flex'>
      <SideBar mainContentRef={mainContentRef} />
      <div
        ref={mainContentRef}
        className='relative flex flex-col flex-grow overflow-hidden shadow-black shadow-md bg-slate-900'
      >
        <TopMenu />
        <Project />
      </div>
    </div>
  )
}

export default MainLayout
