import { classes } from "@/utils/index"
import { useEffect, useRef, useState } from "react"

type Props = {
  extraClasses?: string
  children: React.ReactNode
  speedMs?: number
}

const SlideHorizontal = ({children, speedMs, extraClasses} : Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollingToStart = useRef(false)
  const prevScroll = useRef(0)
  const touchingRef = useRef(false)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const touching = touchingRef.current
      if (scrollRef.current && !touching) {        
        const scrollRefCurrent = scrollRef.current
        prevScroll.current = scrollRefCurrent.scrollLeft
        
        if (!scrollingToStart.current) {
          scrollRefCurrent.scrollTo({
            left: scrollRefCurrent.scrollLeft + 1
          })
          
          if (scrollRefCurrent.scrollLeft === prevScroll.current) {
            scrollingToStart.current = true
            scrollRefCurrent.scrollTo({left: 0, behavior: 'smooth'})
          }
        }                

        if (scrollingToStart.current && scrollRefCurrent.scrollLeft === 0) {
          scrollingToStart.current = false
        }
        
      }
    }, speedMs || 50)  

    return () => {
      clearInterval(scrollInterval)
    }
  }, [])

  const handleMouseOver = () => {
    console.log('Mouse is over biatch')
    touchingRef.current = true
  }

  const handleMouseLeave = () => {
    console.log('Mouse has left the element biatch')
    touchingRef.current = false
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('touchstart', handleMouseOver)
      scrollRef.current.addEventListener('touchend', handleMouseLeave)
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('touchstart', handleMouseOver)
        scrollRef.current.removeEventListener('touchend', handleMouseLeave)
      }
    }
  }, [scrollRef])

  return (
    <div
      className={classes(extraClasses || '', 'no-scrollbar')}            
      ref={scrollRef}
    >
      {children}
    </div>
  )
}

export default SlideHorizontal
