import AppLayout from "@/layouts/users/AppLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeView from "@/views/admins/HomeView"
import AdminsLayout from "@/layouts/admins/AdminsLayout"
import CalendarView from "@/views/admins/CalendarView"
import UsersHomeView from "@/views/users/UsersHomeView"
import ScheduleView from "./views/users/ScheduleView"
import AdminsAuthLayout from "./layouts/admins/AdminsAuthLayout"
import AdminsLoginView from "./views/admins/auth/AdminsLoginView"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<UsersHomeView />} />
          <Route path="schedule" element={<ScheduleView />} />
        </Route>
        <Route path='admins' element={<AdminsLayout />}>
          <Route index element={<HomeView />} />
          <Route path='calendar' element={<CalendarView />} />          
        </Route>
        <Route path='auth/admins' element={<AdminsAuthLayout />}>
          <Route path="login" element={<AdminsLoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router