import Project from '../components/Project'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import { useRef } from 'react'

const MainLayout = () => {
  const mainContentRef = useRef(null)

  return (
    <div className='min-w-full min-h-full flex'>
      <SideBar mainContentRef={mainContentRef} />
      <div
        ref={mainContentRef}
        className='relative flex flex-col flex-grow overflow-hidden shadow-black shadow-md 
          bg-gradient-to-tr bg-slate-900'
      >
        {/* <div className='w-96 h-16 absolute bg-blue-500 top-1/4 blur-3xl rounded-full rotate-45 ' />
        <div className='w-2/3 h-16 absolute bg-green-500 top-3/4 left-1/4 blur-3xl rounded-full rotate-45 ' /> */}
        <TopMenu />
        <Project />
      </div>
    </div>
  )
}

export default MainLayout
