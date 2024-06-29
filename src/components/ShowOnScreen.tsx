import useElementOnScreen from "@/hooks/useElementOnScreen"

type Props = {
  children: React.ReactNode
  reappear?: boolean
  threshold: number
  extraClasses?: string
}

const ShowOnScreen = ({children, reappear, threshold, extraClasses} : Props) => {

  const {containerRef, isVisible} = useElementOnScreen({threshold, reappear})

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      ref={containerRef}
      className={classes(extraClasses || '',
        isVisible ? 'transition duration-300 opacity-100 scale-100 ease-out' : 'transition duration-300 opacity-0 scale-50 ease-in'
      )}
    >
      {children}
    </div>          
  )
}

export default ShowOnScreen
