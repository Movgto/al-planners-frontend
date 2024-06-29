import { useQueryClient } from "@tanstack/react-query"
import { Link, useLocation } from "react-router-dom"
import PopMenu from "./PopMenu"
import useAdmin from "@/hooks/useAdmin"

const tabs = [
  {
    title: 'Eventos',
    href: '/admins'
  },
  {
    title: 'Calendario',
    href: '/admins/calendar'
  }
]

const Header = () => {
  const location = useLocation()

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const { data } = useAdmin()

  const queryClient = useQueryClient()

  const logout = () => {
    localStorage.removeItem('ALPLANNERS_AUTH_TOKEN')
    queryClient.invalidateQueries({ queryKey: ['admin'] })
  }

  if (data) return (
    <header
      className="relative px-1 w-full flex justify-center bg-rose-400"
    >
      <nav
        className="max-w-5xl gap-2 text-lg text-white font-semibold hidden lg:flex"
      >
        {tabs.map(tab => (
          <Link
            className={classes(location.pathname === tab.href ? 'border-b-4 border-rose-600' : 'border-b-0', 'flex items-center py-2')}
            to={tab.href}
          ><p>{tab.title}</p></Link>
        ))}
        <div className="flex items-center px-4">
          <p>Hola, {data.name.split(' ')[0]}</p>
        </div>
        <div
          className="p-2"
        >
          <button
            type="button"
            className="bg-rose-800 font-light text-white text-sm px-2 py-1 uppercase hover:bg-rose-600"
            onClick={logout}
          >Cerrar Sesión</button>
        </div>
      </nav>

      <PopMenu logout={logout} user={data} />


    </header>
  )
}

export default Header
