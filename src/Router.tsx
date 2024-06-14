import AppLayout from "@/layouts/users/AppLayout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeView from "@/views/admins/HomeView"
import AdminsLayout from "@/layouts/admins/AdminsLayout"
import CalendarView from "@/views/admins/CalendarView"
import UsersHomeView from "@/views/users/UsersHomeView"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<UsersHomeView />} />
        </Route>
        <Route path='admins' element={<AdminsLayout />}>
          <Route index element={<HomeView />} />
          <Route path='calendar' element={<CalendarView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router