import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AdminsAuthLayout = () => {
  return (
    <>
      <div
        className="bg-zinc-200 w-full min-h-screen flex justify-center items-center p-2"
      >
        <div
          className='w-full max-w-5xl flex flex-col gap-4'
        >
          <div
            className='flex flex-col gap-2'
          >
            <h1
              className='font-playwrite text-slate-800 font-bold text-4xl text-center'
            >AL Planners</h1>
            <h2
              className='text-pink-900 font-semibold text-xl text-center'
            >Administradores</h2>
          </div>

          <Outlet />
        </div>
      </div>
      <ToastContainer
        closeOnClick
        theme="colored"
      />
    </>
  )
}

export default AdminsAuthLayout