import Footer from '@/components/admins/Footer'
import UsersHeader from '@/components/users/UsersHeader'
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AppLayout = () => {
  return (
    <>      
      <UsersHeader />
      <Outlet />
      <Footer />
      <ToastContainer
        closeOnClick
        theme='colored'
      />
    </>
  )
}

export default AppLayout
