import useElementOnScreen from "@/hooks/useElementOnScreen"

type Props = {
  children?: React.ReactNode
  reappear?: boolean
  threshold?: number
  transitionInClasses?: string
  transitionOutClasses?: string
  extraClasses?: string
}

const ShowOnScreen = ({children, reappear, threshold, extraClasses, transitionInClasses, transitionOutClasses} : Props) => {

  const {containerRef, isVisible} = useElementOnScreen({threshold: threshold || 0.5, reappear})

  const classes = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      ref={containerRef}
      className={classes(isVisible ?
        transitionInClasses || '' :
        transitionOutClasses || '',
        extraClasses || '',
        'transition'
      )}
    >
      {children || null}
    </div>              
  )
}

export default ShowOnScreen
