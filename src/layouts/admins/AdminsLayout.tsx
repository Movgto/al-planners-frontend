import Footer from "@/components/admins/Footer"
import Header from "@/components/admins/Header"
import useAdmin from "@/hooks/useAdmin"
import { Navigate, Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const AdminsLayout = () => {

  const {data, isLoading, isError} = useAdmin()

  if (isLoading) {
    return null
  }

  if (isError) {
    return <Navigate to='/auth/admins/login' />
  }

  if (data) return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        closeOnClick
        theme='colored'
      />
    </>
  )
}

export default AdminsLayout
