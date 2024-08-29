import { AdminShort } from "@/types/auth"
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { Fragment } from "react"
import { Link } from "react-router-dom"

type PopMenuProps = {
  logout: () => void
  admin: AdminShort
}

const PopMenu = ({ logout, admin }: PopMenuProps) => {
  return (
    <Popover className="flex lg:hidden">
      <PopoverButton
        className="p-4 hover:bg-rose-300 rounded-full"
      >
        <Bars3Icon className="w-8 h-8 text-white" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-1"
        enter="ease-out duration-200"
        leaveFrom="opacity-100 translate-y-1"
        leaveTo="opacity-0 translate-y-0"
        leave="ease-in duration-200"
      >
        <PopoverPanel
          className="absolute flex w-full p-2 left-0 translate-y-10"
        >
          <div
            className="flex flex-col gap-4 bg-white rounded-lg w-full p-4"
          >
            <h2
              className="text-lg text-rose-800 font-semibold text-center"
            >Hola, {admin.name.split(' ')[0]}</h2>
            <Link
              to="/admins"
              className="hover:text-rose-800"
            >Eventos</Link>
            <Link
              to="/admins/calendar"
              className="hover:text-rose-800"
            >Calendario</Link>
            <button
              type="button"
              onClick={logout}
              className="hover:text-rose-800"             
            >Cerrar Sesión</button>
          </div>
        </PopoverPanel>
      </Transition>

    </Popover>
  )
}

export default PopMenu
