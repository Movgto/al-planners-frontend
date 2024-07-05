import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { PopmenuOpts } from "./UsersHeader"
import { Link } from "react-router-dom"
import { Fragment } from "react"

type Props = {
  opts: PopmenuOpts
}

const UsersPopMenu = ({ opts }: Props) => {    

  return (
    <Popover
      className="flex relative lg:hidden"
    >      
      <PopoverButton
        className="p-2 rounded-full hover:bg-zinc-400/40"
      >
        <Bars3Icon className="size-10" />
      </PopoverButton>
      <Transition
        as={Fragment}
        enterFrom="opacity-0 -translate-y-4"
        enterTo="opacity-100 translate-y-0"
        enter="duration-500 ease-out"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-4"
        leave="duration-200 ease-in"    
      >
        <PopoverPanel
          className="fixed w-full left-0 top-14 font-lora text-2xl font-bold bg-zinc-200"
        >
          <ul
            className="flex w-full flex-col p-10 text-2xl text-zinc-800 font-bold font-lora"
          >
            {opts.map(el => (
              <li
                className="flex w-full"
              >
                <Link
                  className="flex w-full py-5 justify-between items-center group border"
                  to={el.href}
                >
                  <p>{el.title}</p>
                  <i className="fa-solid fa-circle text-base hidden group-hover:block" />             
                </Link>                
              </li>
            ))}
          </ul>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}

export default UsersPopMenu
