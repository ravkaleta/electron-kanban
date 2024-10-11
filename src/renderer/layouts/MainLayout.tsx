import MainContainer from './components/MainContainer'
import SideBar from './components/SideBar'

const MainLayout = () => {
  console.log('render Layout')

  return (
    <div className='min-w-full min-h-full flex'>
      <SideBar />
      <MainContainer />
    </div>
  )
}

export default MainLayout
