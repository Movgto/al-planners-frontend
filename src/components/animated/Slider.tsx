import { SliderContent } from "@/utils/presentation"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { ParallaxBanner } from "react-scroll-parallax"
import { classes } from "@/utils/index"

type Props = {
  sliderContent: SliderContent
}

type Transition = {
  transitioning: boolean
  direction: 'right' | 'left' | 'none'
}

const Slider = ({sliderContent} : Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState<Transition>(
    {
      transitioning: false,
      direction: 'none'
    }
  )
  const sliderRef = useRef<HTMLDivElement>(null)

  const leftSlide = () => {    
    scrollToSlider()
    if (currentSlide === 0) {
      setCurrentSlide(sliderContent.length - 1)
      return
    }

    setCurrentSlide(currentSlide - 1)
  }

  const rightSlide = () => {    
    scrollToSlider()
    if (currentSlide === sliderContent.length - 1) {
      setCurrentSlide(0)
      return
    }

    setCurrentSlide(currentSlide + 1)
  }

  const scrollToSlider = () => {
    if (sliderRef.current) {
      const sliderRefCurrent = sliderRef.current

      const topOffset = sliderRefCurrent.getBoundingClientRect().top + window.scrollY

      console.log('Top offset', topOffset)

      if (window.screenTop !== topOffset) {
        window.scrollTo({
          behavior: 'smooth',
          top: topOffset
        })
      }
    }
  }

  let transitionTimeout : NodeJS.Timeout | null = null

  useEffect(() => {
    if (transitionTimeout) {
      clearTimeout(transitionTimeout)
    }

    transitionTimeout = setTimeout(() => {
      if (!isTransitioning.transitioning) return

      switch(isTransitioning.direction) {
        case 'right':
          rightSlide()
          break
        case 'left':
          leftSlide()
          break
        default: break
      }

      setIsTransitioning({
        transitioning: false,
        direction: 'none'
      })      
    }, 200)    

  }, [isTransitioning, currentSlide])

  return (
    <ParallaxBanner    
        layers={[
          {
            image: sliderContent[currentSlide].bgImage,
            speed: 50
          }
        ]}
        className={classes('transition relative min-h-screen my-10 flex justify-center items-center',
          isTransitioning.transitioning ? 'duration-200 opacity-80 ease-in' : 'duration-300 opacity-100 ease-out'
        )}               
    >
      <div
        className="absolute inset-0"
        ref={sliderRef}
      >
      </div>
      <div
        className={classes("transition flex flex-col w-full gap-5 px-10 justify-center lg:items-center lg:justify-center lg:flex-row bg-zinc-600/60 text-white font-lora shadow-xl z-10",
          isTransitioning.transitioning ? 'duration-200 opacity-0 ease-in' : 'duration-300 delay-500 opacity-100 ease-out'
        )}
      >
        {sliderContent[currentSlide].content}
      </div>
      <div
        className="absolute top-50 left-2 text-white z-10 hover:cursor-pointer"
        onClick={() => setIsTransitioning({transitioning: true, direction: 'left'})}
      >
        <ChevronLeftIcon className="size-10" />
      </div>      
      <div
        className="absolute top-50 right-2 text-white z-10 hover:cursor-pointer"
        onClick={() => setIsTransitioning({transitioning: true, direction: 'right'})}
      >
        <ChevronRightIcon className="size-10" />
      </div>
    </ParallaxBanner>
  ) 
}

export default Slider
