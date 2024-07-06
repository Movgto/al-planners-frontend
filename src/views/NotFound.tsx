import ALLogo from '@/images/logos/al_logo_circle_black.png'

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex flex-col gap-5 justify-center items-center">
      <img
        className='size-20'
        alt="al logo"
        src={ALLogo}
      />
      <div
        className="border-zinc-800 border-y bg-white text-zinc-800 font-lora text-xl"
      >
        <h3>No se encontró la página</h3>
      </div>
    </div>
  )
}

export default NotFound
