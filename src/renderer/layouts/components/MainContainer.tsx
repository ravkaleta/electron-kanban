import React from 'react'
import Header from './Header'
import Project from '../../components/Project'
import { useProjectStore } from '../../store/projectStore'

const MainContainer = () => {
  const projectId = useProjectStore((state) => state.id)

  if (!projectId) {
    return (
      <div className='flex flex-grow items-center justify-center text-neutral-300'>
        Create your first project
      </div>
    )
  }

  return (
    <div className='flex flex-col flex-grow overflow-hidden'>
      <Header />
      <Project />
    </div>
  )
}

export default MainContainer
