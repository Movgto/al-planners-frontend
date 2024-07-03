import { useCallback, useEffect, useRef, useState } from "react"
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
    console.log('previous scroll pos and current', scrollPosRef.current, newScrollPos)
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
      className={classes("fixed transition px-1 w-full flex justify-center z-10",
        location.pathname === '/schedule' ? '' : '',
        isOnTop ? 'duration-100 bg-zinc-800 text-white opacity-100 ease-out' :
          'duration-200 bg-transparent text-black opacity-60 ease-in',
        !isOnTop && scrollingDown ? '-translate-y-20 duration-300 ease-out' : '',
        !isOnTop && !scrollingDown ? 'translate-y-0 duration-300 ease-in' : ''
      )}
    >
      <nav
        className="w-full max-w-5xl flex justify-between gap-2 text-lg font-semibold font-lora"
      >
        <div
          className={classes(isOnTop ? "bg-[url('/src/images/logos/al_logo_circle_white.png')]" : "bg-[url('/src/images/logos/al_logo_circle_black.png')]",
            "w-10 h-10 bg-contain bg-center bg-no-repeat border rounded-full m-1"
          )}
        >          
        </div>
        <div
          className="flex justify-center gap-4"
        >
          {tabs.map(tab => (

            <Link
              className={classes(location.pathname === tab.href ? `border-b-4 ${isOnTop ? 'border-zinc-200' : 'border-zinc-800'}` : 'border-b-0', 'py-2 flex items-center')}
              to={tab.href}
            ><p>{tab.title}</p></Link>
          ))}
        </div>
        <div></div>
      </nav>
    </header>
  )
}

export default UsersHeader