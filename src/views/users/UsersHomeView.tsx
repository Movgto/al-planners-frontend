import ShowOnScreen from '@/components/ShowOnScreen'
import '@/styles/landpage.css'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { ParallaxBanner } from 'react-scroll-parallax'

const UsersHomeView = () => {

  return (
    <>
      <ParallaxBanner
        layers={[{
          image: '/landpage_bg.jfif',
          speed: -50,
        }]}
        className='-mt-12 mb-16 pt-14 lg:pt-0 min-h-screen bg-cover flex justify-center items-center'
      >
        <ShowOnScreen
          extraClasses="relative flex flex-col px-2 py-14 lg:flex-row lg:items-center gap-6 justify-between bg-black/40 rounded-2xl lg:p-10 max-w-6xl"
          threshold={0.5}
          reappear
        >
          <p
            className='font-playwrite text-white text-xl font-thin flex-1'
          >
            <span className='font-bold'>¡Somos AL Planners!</span>
            <br />
            <br />
            Somos un equipo dedicado a la logística y planeación de eventos,
            siendo nuestra especialidad...¡Las bodas!.
            <br />
            <br />
            Conseguimos crear el ambiente preciso
            para cada tipo de celebración tomando en cuenta las piezas clave para que tu ceremonia,
            banquete y fiesta sean una suma de grandiosos momentos.
            <br />
            <br />
            <span className='font-bold'>Al Planners</span> es sinónimo de novios felices y bodas inolvidables.

            Nuestra meta es cuidar uno de los detalles de tu boda para que tu te encargues de disfrutar
            cada parte del proceso, desde la <span className='font-bold'>planeación</span> hasta el <span className='font-bold'>Gran Día</span>. Desde el primer día que trabajemos
            juntos te daremos una guía completa y le daremos forma a tu evento para asegurar que desde un principio
            tengamos todo tu evento bajo control.
          </p>

          <div
            className='flex-1 bg-[url("/presentation_01.jfif")] min-h-[24rem] bg-contain bg-no-repeat bg-center'
          ></div>
        </ShowOnScreen>
        <div className='absolute bottom-0 left-1/2 text-white'>
          <ChevronDownIcon width="46px" height="46px" />
        </div>
      </ParallaxBanner>
      <section
        className="
              overflow-y-auto"
      >
        <div className='flex flex-col items-center gap-32'>
          <ShowOnScreen
            extraClasses="flex flex-col lg:flex-row gap-12 justify-between bg-black/40 rounded-2xl p-10 max-w-6xl shadow-2xl"
            threshold={0.5}
            reappear
          >
            <div
              className='flex-1 bg-[url("/presentation_02.jfif")] min-h-[24rem] bg-contain bg-no-repeat bg-center'
            ></div>
            <p
              className='font-playwrite text-white text-xl font-thin flex-1'
            >
              <span className='font-bold'>¡Más de 5 años haciendo sueños realidad!</span>
              <br />
              <br />
              Llevamos más de 5 años en el mercado y decenas de eventos nos respaldan como uno de los proveedores
              de coordinación más solicitados de Monterrey y área metropolitana.

              Contamos con una amplia cartera de proveedores confiables y capaces de ofrecerte cualquier detalle
              que necesites para ese gran día.
            </p>
          </ShowOnScreen>

          <ShowOnScreen
            extraClasses="flex flex-col lg:flex-row gap-12 justify-between bg-black/40 rounded-2xl p-10 max-w-6xl shadow-2xl"
            threshold={0.5}
            reappear
          >
            <div
              className='flex-1 bg-[url("/presentation_03.jfif")] min-h-[24rem] bg-contain bg-no-repeat bg-center'
            ></div>
            <p
              className='font-playwrite text-white text-xl font-thin flex-1'
            >
              <span className='font-bold'>¡No todo son bodas!</span>
              <br />
              <br />
              En el transcurso de estos años hemos crecido de manera que ya no solo hacemos bodas.<br /><br />
              Eventos empresariales, posadas, XV años, Baby Shower o el evento que necesites, contáctanos
              y averigua de qué forma podemos ayudarte.
            </p>
          </ShowOnScreen>

          <ShowOnScreen
            extraClasses="flex flex-col lg:flex-row gap-12 justify-between bg-black/40 rounded-2xl p-10 max-w-6xl w-full shadow-2xl"
            threshold={0.5}
            reappear
          >
            <div
              className='flex flex-col flex-1 gap-4 font-playwrite text-white text-xl font-thin'
            >
              <p>
                <span className='font-bold'>Servicios</span>
                <br />
                <br />
                Algunos de los servicios con los que contamos podemos mencionar:
              </p>
              <ul className='list-disc'>
                <li>Diseño de tu evento</li>
                <li>Recomendaciones/Asesoría de decoración</li>
                <li>Asesoría ilimitada</li>
                <li>Logística del evento</li>
                <li>Cartera de proveedores</li>
                <li>Supervisión del montaje</li>
                <li>Conteo de asistencia y platillos</li>
                <li>Confirmación de invitados</li>
                <li>Coordinación de ceremonia civil</li>
                <li>Coordinación de ceremonia religiosa</li>
                <li>Coordinación de despedida de soltera</li>
                <li>Recolección y entrega de ramos</li>
                <li>Hostess</li>
              </ul>
            </div>
            <div
              className='flex-1 bg-[url("/presentation_04.jfif")] min-h-[24rem] bg-contain bg-no-repeat bg-center'
            ></div>
          </ShowOnScreen>
        </div>        
      </section>
      <ParallaxBanner
        layers={[{
          image:"/schedulelink_bg.jpg",
          speed: 50
        }]}
        className='min-h-screen my-10 flex justify-center items-center'
      >
        <div className='inset-0 flex flex-col items-center gap-10 z-10'>
          <h2 className='font-playwrite text-2xl text-white bg-black/40 p-2'>Si quieres saber más sobre la boda de tus sueños...</h2>
          <Link to="/schedule" className='bg-pink-400 hover:cursor-pointer hover:bg-white hover:text-pink-400 py-2 px-4 text-white font-bold text-2xl'>Agendar Cita</Link>
        </div>
      </ParallaxBanner>
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
