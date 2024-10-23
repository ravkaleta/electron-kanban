import { useProjectStore } from '../../store/projectStore'

const TopMenu = () => {
  const projectName = useProjectStore((state) => state.name)

  if (!projectName) {
    return
  }

  return (
    <div className='flex items-center w-full h-14 mb-2'>
      <div
        className='relative ml-16 text-center text-white font-bold rounded-b-lg pl-2 pr-6 py-1
        after:absolute after:w-full after:h-[3px] after:bg-gradient-to-r after:from-blue-400 after:to-blue-500 after:top-full after:left-0 after:rounded-full'
      >
        {projectName}
      </div>
    </div>
  )
}

export default TopMenu
