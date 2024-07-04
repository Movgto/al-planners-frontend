export const collageData = [
  {
    url: '/collage_01.jpg'
  },
  {
    url: '/collage_02.jpg'
  },
  {
    url: '/collage_03.jpg'
  },
  {
    url: '/collage_04.jpg'
  },
  {
    url: '/collage_05.jpg'
  },
  {
    url: '/collage_06.jpg'
  },
  {
    url: '/collage_07.jpg'
  },
  {
    url: '/collage_08.jpg'
  },
]

export const sliderContent = [
  {
    content: (<>
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
    </>),
    bgImage: '/collage_01.jpg'
  },
  {
    content: (<>
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
    </>),
    bgImage: '/collage_02.jpg'
  },
  {
    content: (<>
      <div
        className='flex flex-col max-w-4xl text-justify flex-1 gap-4 font-lora text-white text-xl font-thin'
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
    </>),
    bgImage: '/collage_03.jpg'
  },
]

export type SliderContent = typeof sliderContent