import Footer from '@/components/admins/Footer'
import Header from '@/components/admins/Header'
import {Outlet} from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout
