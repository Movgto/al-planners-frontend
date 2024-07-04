import ShowOnScreen from '@/components/animated/ShowOnScreen'
import '@/styles/landpage.css'
import { Link } from 'react-router-dom'
import ALLogoBlack from '@/images/logos/al_logo_black.png'
import ALCircleBlack from '@/images/logos/al_logo_circle_black.png'
import { collageData, sliderContent } from '@/utils/presentation.tsx'
import SlideHorizontal from '@/components/animated/SlideHorizontal'
import Slider from '@/components/animated/Slider'

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

      <ShowOnScreen
        extraClasses='w-full flex justify-center items-center min-h-screen'
        transitionInClasses='duration-500 opacity-100 scale-x-100 ease-out'
        transitionOutClasses='duration-200 opacity-0 scale-x-50 ease-in'
      >
        <div className='w-full bg-white border-zinc-800 border-y-2
                        py-20 flex flex-col items-center gap-10 z-10'
        >
          <ShowOnScreen
            transitionInClasses='translate-y-0 opacity-100 ease-out duration-500 delay-[300ms]'
            transitionOutClasses='-translate-y-4 opacity-0 ease-in duration-200'
          >
            <img
              alt="schedule al logo"
              src={ALCircleBlack}
              className='object-contain w-40'
            />
          </ShowOnScreen>
          <ShowOnScreen
            extraClasses='flex flex-nowrap overflow-x-clip justify-center'
            transitionInClasses='duration-700 w-full ease-out opacity-100 delay-[800ms]'
            transitionOutClasses='duration-200 opacity-0 w-0 ease-in'
          >
            <h2 className='font-lora text-2xl text-justify text-zinc-800 p-2'>Si quieres saber más sobre la boda de tus sueños...</h2>
          </ShowOnScreen>
          <ShowOnScreen
            extraClasses='flex flex-nowrap overflow-x-clip justify-center'
            transitionInClasses='duration-700 w-full ease-out opacity-100 delay-[500ms]'
            transitionOutClasses='duration-200 opacity-0 w-0 ease-in'
          >
            <hr className='border border-[#d0c383] w-1/2' />
          </ShowOnScreen>
          <ShowOnScreen
            extraClasses='flex flex-nowrap overflow-x-clip justify-center'
            transitionInClasses='duration-700 scale-100 ease-out opacity-100 delay-[1000ms]'
            transitionOutClasses='duration-200 scale-50 opacity-0 ease-in'
          >
            <Link
              to="/schedule"
              className='font-lora bg-zinc-600 hover:cursor-pointer hover:bg-white
                      transition hover:text-zinc-800 py-2 px-4 text-white font-bold text-2xl'
            >Agendar Cita</Link>
          </ShowOnScreen>

          
          
        </div>
      </ShowOnScreen>

      <section
        id="contact"
        className='text-xl px-4 py-6'
      >
        <h3 className='font-bold'>Estaremos encantados de trabajar en tu evento!</h3>

        <p>Si deseas conocer mas detalles sobre nuestro trabajo no dudes en contactarte con nosotros.</p>

        <div className='flex gap-4 my-4'>
          <a rel="noopener" target='_blank' href="https://wa.me/5218122011621" className='hover:underline'>
            <i className='fa-brands fa-whatsapp text-2xl'></i> 812 201 1621
          </a>
          <a rel="noopener" target='_blank' href="https://www.instagram.com/al_planners" className='hover:underline'>
            <i className='fa-brands fa-instagram text-2xl'></i> @al_planners
          </a>
        </div>
      </section>
    </>
  )
}

export default UsersHomeView
