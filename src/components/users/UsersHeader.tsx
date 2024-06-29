import { Link, useLocation } from "react-router-dom"

const tabs = [
  {
    title: 'Inicio',
    href: '/'
  },
  {
    title: 'Agendar Cita',
    href: '/schedule'
  }
]

const UsersHeader = () => {
  const location = useLocation()

  const classes = (...classes : string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <header
      className={classes("px-1 w-full flex justify-center z-10",
        location.pathname === '/schedule' ? 'bg-rose-300' : ''
      )}
    >
      <nav
        className="max-w-5xl flex gap-2 text-lg text-white font-semibold"
      >
        {tabs.map(tab => (
          <Link
            className={classes(location.pathname === tab.href ? 'border-b-4 border-rose-600' : 'border-b-0', 'py-2')}
            to={tab.href}
          >{tab.title}</Link>
        ))}        
      </nav>
    </header>
  )
}

export default UsersHeader