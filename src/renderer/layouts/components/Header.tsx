import { useProjectStore } from '../../store/projectStore'

const Header = () => {
  const projectName = useProjectStore((state) => state.name)

  return (
    <div className='w-full h-8'>
      <div className='mx-auto w-1/5 text-center text-white bg-neutral-900 border-x border-b border-neutral-700 rounded-b-lg py-1'>
        {projectName}
      </div>
    </div>
  )
}

export default Header
