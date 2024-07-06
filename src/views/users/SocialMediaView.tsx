import { Transition } from "@headlessui/react"
import BodasLogo from '@/images/logos/bodas_logo.svg'
import { Fragment } from "react"
import { Link } from "react-router-dom"

const socialMediaData = [
  {
    title: '@al_planners',
    href: 'https://www.instagram.com/al_planners',
    icon: 'fa-instagram'
  },
  {
    title: 'AL Planners',
    href: 'https://www.facebook.com/ALPlanners',
    icon: 'fa-facebook'
  },
  {
    title: '@alplanners',
    href: 'https://www.tiktok.com/@alplanners',
    icon: 'fa-tiktok'
  },
]

const SocialMediaView = () => {
  return (
    <div
      className="flex flex-col gap-4 py-20 mt-16 font-lora"
    >
      <Transition
        show={true}
        appear
        as={Fragment}
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        enter="duration-500 ease-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
        leave="duration-200 ease-in"
      >
        <h2
          className="flex flex-col gap-4 text-zinc-800 font-bold text-xl"
        >¡Visite nuestras redes sociales!</h2>
      </Transition>
      <Transition
        show={true}
        appear
        as={Fragment}
        enterFrom="opacity-0 scale-y-0"
        enterTo="opacity-100 scale-y-100"
        enter="duration-500 ease-out"
        leaveFrom="opacity-100 scale-y-100"
        leaveTo="opacity-0 scale-y-0"
        leave="duration-200 ease-in"
      >
        <ul
          className="flex flex-col w-full gap-4 bg-white border-zinc-800 border-y p-2"
        >
          {socialMediaData.map((data, index) => (
            <li
              key={index}
              className="flex w-full text-lg"
            >
              <Link
                to={data.href}
                target="_blank"
                className="flex gap-4 items-center group"
              >
                <i
                  className={`fa-brands ${data.icon}`}
                ></i>
                <span
                  className="group-hover:underline"
                >{data.title}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="https://www.bodas.com.mx/wedding-planner/al-planners--e232849"
              target="_blank"
              className="flex gap-4 items-center group"
            >
              <img
                alt="bodas logo"
                src={BodasLogo}
                className="size-6"
              />
              <span
                className="group-hover:underline"
              >Bodas.com</span>
            </Link>
          </li>
        </ul>
      </Transition>
    </div>
  )
}
export default SocialMediaView
