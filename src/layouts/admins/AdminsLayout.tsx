import Footer from "@/components/admins/Footer"
import Header from "@/components/admins/Header"
import { Outlet } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const AdminsLayout = () => {
  return (
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
