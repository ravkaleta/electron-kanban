import { Minus, Square, X } from 'react-feather'

const Navbar = () => {
  const handleExit = () => {
    window.electron.closeApp()
  }

  const handleMinimize = () => {
    window.electron.minimizeApp()
  }

  const handleMaximize = () => {
    window.electron.maximizeApp()
  }

  return (
    <div className='flex items-center p-4 justify-between w-full h-8 bg-slate-950 rounded-t-xl drag'>
      <h1 className='text-base font-bold text-blue-500'>TooCan</h1>
      <div className='flex items-center'>
        <button
          onClick={handleMinimize}
          className='text-white p-2 no-drag transition-all hover:bg-slate-900'
        >
          <Minus />
        </button>
        <button
          onClick={handleMaximize}
          className='text-white p-2 no-drag transition-all hover:bg-slate-900'
        >
          <Square size={20} />
        </button>
        <button
          onClick={handleExit}
          className='text-white p-2 no-drag transition-all hover:bg-slate-900'
        >
          <X />
        </button>
      </div>
    </div>
  )
}

export default Navbar
