import { useEffect, useRef, useState } from "react"

type Options = {
  threshold: number
  reappear?: boolean
}

const useElementOnScreen = (options : Options) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const makeAppear = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    if (entry.isIntersecting) {
      setIsVisible(true)
    }
  }
  
  const makeReappear = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries

    setIsVisible(entry.isIntersecting)
  }
  
  const callback = options.reappear ? makeReappear : makeAppear

  useEffect(() => {
    const containerRefCurrent = containerRef.current
    const observer = new IntersectionObserver(callback, options)     

    if (containerRefCurrent) {
      observer.observe(containerRefCurrent)
    }

    return () => {
      if (containerRefCurrent) {
        observer.unobserve(containerRefCurrent)
      }
    }
  }, [containerRef, isVisible])

  return {containerRef, isVisible}
}

export default useElementOnScreen