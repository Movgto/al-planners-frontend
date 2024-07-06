import ShowOnScreen from '@/components/animated/ShowOnScreen'
import '@/styles/landpage.css'
import ALLogoBlack from '@/images/logos/al_logo_black.png'
import { collageData, sliderContent } from '@/utils/presentation.tsx'
import SlideHorizontal from '@/components/animated/SlideHorizontal'
import Slider from '@/components/animated/Slider'
import ContactSection from '@/components/users/ContactSection'

const UsersHomeView = () => {

  return (
    <>
      <div
        className="relative flex justify-center items-center
         bg-white my-16 w-full overflow-y-clip"
      >
        <div
          className='absolute top-0 left-0 hidden lg:grid grid-cols-1 grid-flow-row opacity-50'
        >
          {collageData.map((data, index) => {

            if (index > 3) return null

            return (
              <ShowOnScreen
                transitionInClasses={`duration-500 translate-y-0 opacity-100 delay-[${100 + 200 * index}ms] ease-out]`}
                transitionOutClasses='duration-200 -translate-y-2 opacity-0'
                extraClasses="bg-cover bg-no-repeat bg-center w-60 h-60"
              >
                <img
                  alt={`collage photo ${index + 1}`}
                  src={data.url}
                  className='object-cover object-center w-full h-full'
                />
              </ShowOnScreen>
            )
          }
          )}
        </div>
        <div
          className='absolute top-0 right-0 hidden lg:grid grid-cols-1 grid-flow-row opacity-50 '
        >
          {collageData.map((data, index) => {
            if (index < 4) return null

            return (
              <ShowOnScreen
                transitionInClasses={`duration-500 translate-y-0 opacity-100 delay-[${100 + 200 * index}ms] ease-out]`}
                transitionOutClasses='duration-200 -translate-y-2 opacity-0'
                extraClasses="bg-cover bg-no-repeat bg-center w-60 h-60"
              >
                <img
                  alt={`collage photo ${index + 1}`}
                  src={data.url}
                  className='object-cover object-center w-full h-full'
                />
              </ShowOnScreen>
            )
          }
          )}
        </div>
        <div
          className="max-w-5xl flex flex-col px-2 py-6
          lg:flex-row lg:items-center lg:p-6 gap-6 justify-center border-t border-zinc-800 my-4"
        >
          <ShowOnScreen
            extraClasses='flex flex-col font-lora text-justify text-xl font-thin flex-1 gap-6 bg-white/60 p-4'
            transitionInClasses='duration-500 opacity-100 translate-y-0'
            transitionOutClasses='duration-400 opacity-0 -translate-y-2'
          >
            <img
              alt="al logo black"
              className='my-2'
              src={ALLogoBlack}
            />

            <div className='flex-[3]'>
              <span className='font-bold'>¡Somos AL Planners!</span>
              <br />
              <br />
              Somos un equipo dedicado a la logística y planeación de eventos,
              siendo nuestra especialidad... <span className='font-bold'>¡Las bodas!</span>
              <br />
              <br />
              Conseguimos crear el ambiente preciso
              para cada tipo de celebración tomando en cuenta las piezas clave para que tu ceremonia,
              banquete y fiesta sean una suma de grandiosos momentos.
              <br />
              <br />
              <span className='font-bold'>Al Planners</span> es sinónimo de novios felices y bodas inolvidables.
              <p>
                Nuestra meta es cuidar uno de los detalles de tu boda para que tu te encargues de disfrutar
                cada parte del proceso, desde la <span className='font-bold'>planeación</span> hasta el <span className='font-bold'>Gran Día</span>. Desde el primer día que trabajemos
                juntos te daremos una guía completa y le daremos forma a tu evento para asegurar que desde un principio
                tengamos todo tu evento bajo control.
              </p>
            </div>
          </ShowOnScreen>

          <ShowOnScreen
            transitionInClasses='duration-500 delay-0 lg:delay-200 ease-out opacity-100 translate-x-0'
            transitionOutClasses='duration-200 ease-in opacity-0 translate-x-2'
            extraClasses='flex-1 border-t border-l-0 lg:border-l lg:border-t-0
                        border-[#d0c383] p-4'
            threshold={0.5}
          >
            <div
              className='rounded-xl overflow-clip'
            >
              <img
                alt="presentation photo"
                src="/presentation_01.jfif"
              />
            </div>
          </ShowOnScreen>
        </div>
      </div>

      <SlideHorizontal
        extraClasses='flex w-full max-w-5xl overflow-x-auto transition ease mb-10'
      >
        <div className='flex gap-10'>
          {collageData.map((data, index) => (
            <ShowOnScreen
              reappear
              threshold={0.2}
              transitionInClasses={`duration-500 translate-y-0 opacity-100 delay-[${100 + 200 * index}ms] ease-out]`}
              transitionOutClasses='duration-200 -translate-y-2 scale-80 opacity-60 ease-in'
              extraClasses="flex-shrink-0 bg-cover bg-no-repeat bg-center w-60 h-60"
            >
              <img
                alt={`collage 2 photo ${index + 1}`}
                src={data.url}
                className='object-cover object-center w-full h-full'
              />
            </ShowOnScreen>
          ))}
        </div>
      </SlideHorizontal>
      <section
        className="overflow-y-auto w-full"
      >
        <Slider
          sliderContent={sliderContent}
        />
      </section>

      <ContactSection />      
    </>
  )
}

export default UsersHomeView
