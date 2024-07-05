import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import UsersPopMenu from "./UsersPopMenu"

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

export type PopmenuOpts = typeof tabs

const UsersHeader = () => {
  const scrollPosRef = useRef(window.scrollY)
  const [scrollPos, setScrollPos] = useState(window.scrollY)
  const scrollingDownRef = useRef(false)
  const [scrollingDown, setScrollingDown] = useState(false)
  const location = useLocation()

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const handleScroll = useCallback(() => {
    const newScrollPos = window.scrollY
    scrollingDownRef.current = newScrollPos > scrollPosRef.current
    scrollPosRef.current = newScrollPos

    setScrollPos(scrollPosRef.current)
    setScrollingDown(scrollingDownRef.current)
  }, [scrollPosRef, scrollingDownRef])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])



  const isOnTop = scrollPos <= 50

  return (
    <header
      className={classes("fixed transition px-1 w-full flex justify-center z-[20] overflow-y-visible",
        location.pathname === '/schedule' ? '' : '',
        'duration-100 bg-zinc-800 text-white opacity-100 ease-out',
        !isOnTop && scrollingDown ? '-translate-y-20 duration-300 ease-out' : '',
        !isOnTop && !scrollingDown ? 'translate-y-0 duration-300 ease-in' : ''
      )}
    >
      <nav
        className="w-full max-w-5xl flex items-center justify-center lg:justify-between gap-4 text-lg font-semibold font-lora"
      >
        <Link
          to="/"
        >
          <div
            className={classes("bg-[url('/src/images/logos/al_logo_circle_white.png')]",
              "w-10 h-10 bg-contain bg-center bg-no-repeat border rounded-full m-1"
            )}
          ></div>
        </Link>
        <div
          className="hidden lg:flex justify-center gap-4"
        >
          {tabs.map(tab => (

            <Link
              className={classes(location.pathname === tab.href ? `border-b-4 border-zinc-200` : 'border-b-0', 'py-2 flex items-center')}
              to={tab.href}
            ><p>{tab.title}</p></Link>
          ))}
        </div>
        <UsersPopMenu opts={tabs} />
        <div
          className="hidden lg:block"
        ></div>
      </nav>
    </header >
  )
}

export default UsersHeader