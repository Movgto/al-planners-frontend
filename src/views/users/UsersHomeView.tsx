import ShowOnScreen from '@/components/animated/ShowOnScreen'
import '@/styles/landpage.css'
import { Link } from 'react-router-dom'
import { ParallaxBanner } from 'react-scroll-parallax'
import ALLogoBlack from '@/images/logos/al_logo_black.png'
import { collageData } from '@/utils/presentation'

const UsersHomeView = () => {

  return (
    <>
      <div
        className="relative flex justify-center items-center
         bg-white my-16 w-full overflow-y-clip"
      >
        <div
          className='absolute top-0 left-0 grid grid-cols-1 grid-flow-row opacity-50'
        >
          {collageData.map((data, index) => {

            if (index > 3) return null

            return (
              <ShowOnScreen
                transitionInClasses={`duration-500 translate-y-0 opacity-100 delay-[${100 + 200 * index}ms] ease-out]`}
                transitionOutClasses='duration-200 -translate-y-2 opacity-0'
                extraClasses={`w-60 h-60`}
              >
                <img
                  alt={`collage photo ${index + 1}`}
                  src={data.url}
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
                extraClasses={`bg-[url("${data.url}")] bg-center bg-cover bg-no-repeat w-60 h-60`}
              />
            )
          }
          )}
        </div>
        <div
          className="max-w-5xl flex flex-col px-2 py-6
          lg:flex-row lg:items-center lg:p-6 gap-6 justify-center border-t border-black my-4"
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
      <div
        className='grid grid-rows-3 lg:grid-rows-1 grid-cols-4 lg:grid-cols-8 mb-0 lg:mb-10'
      >
        {collageData.map((data, index) => (
          <ShowOnScreen
            transitionInClasses={`duration-500 translate-y-0 opacity-100 delay-[${100 + 200 * index}ms] ease-out]`}
            transitionOutClasses='duration-200 -translate-y-2 opacity-0'
            extraClasses={`bg-[url("${data.url}")] bg-center bg-cover bg-no-repeat w-40 h-40 lg:w-60 lg:h-60`}
          />
        ))}
      </div>
      <section
        className="overflow-y-auto"
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
              className='font-lora text-white text-xl font-thin flex-1'
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
              className='font-lora text-white text-xl font-thin flex-1'
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
              className='flex flex-col flex-1 gap-4 font-lora text-white text-xl font-thin'
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
        layers={[
          {
            image: "/schedulelink_bg.jpg",
            speed: 50
          }
        ]}
        className='min-h-screen my-10 flex justify-center items-center'
      >
        <div className='inset-0 flex flex-col items-center gap-10 z-10'>
          <h2 className='font-lora text-2xl text-white bg-black/40 p-2'>Si quieres saber más sobre la boda de tus sueños...</h2>
          <Link to="/schedule" className='bg-zinc-600 hover:cursor-pointer hover:bg-white hover:text-zinc-800 py-2 px-4 text-white font-bold text-2xl'>Agendar Cita</Link>
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
