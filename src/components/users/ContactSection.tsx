import { Link } from 'react-router-dom'
import ShowOnScreen from '../animated/ShowOnScreen'
import ALCircleBlack from '@/images/logos/al_logo_circle_black.png'

const ContactSection = () => {
  return (
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
          extraClasses='flex flex-col lg:flex-row gap-4 justify-center'
          transitionInClasses='duration-700 scale-100 ease-out opacity-100 delay-[1000ms]'
          transitionOutClasses='duration-200 scale-50 opacity-0 ease-in'
        >
          <Link
            to="/agendar"
            className='font-lora bg-zinc-600 hover:cursor-pointer hover:bg-white
                      transition hover:text-zinc-800 py-2 px-4 text-white text-center font-bold text-2xl'
          >Agendar Cita</Link>
          <Link
            to="https://wa.me/5218122011621"
            target='_blank'
            className='font-lora bg-zinc-600 hover:cursor-pointer hover:bg-white
                      transition hover:text-zinc-800 py-2 px-4 text-white text-center font-bold text-2xl'
          >Más Información</Link>
        </ShowOnScreen>
      </div>
    </ShowOnScreen>
  )
}

export default ContactSection
