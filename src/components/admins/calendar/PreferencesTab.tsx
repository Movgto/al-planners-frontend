import { getAdminPreferences } from "@/api/authAPI"
import { eventColors } from "@/types/auth"
import { classes } from "@/utils/index"
import { useMutation, useQuery } from "@tanstack/react-query"
import '@/styles/colors.css'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { updateEventColor } from "@/api/adminPreferencesAPI"
import { toast } from "react-toastify"

const PreferencesTab = () => {

  const { data, isError, error } = useQuery({
    queryKey: ['adminPreferences'],
    queryFn: getAdminPreferences
  })

  const {mutate} = useMutation({
    mutationFn: updateEventColor,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    }
  })

  const [selected, setSelected] = useState<null | string>(null)

  const handleForm = () => {
    if (!selected) return
    mutate(selected!)
  } 

  if (data) return (
    <div
      className="flex flex-col gap-4 px-10"
    >
      <h3>Color de tus citas</h3>
      <Listbox
        value={selected}
        onChange={setSelected}
      >
        <ListboxButton
          className={classes(
            'relative block w-full rounded-lg bg-white border border-slate-500 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
          )}
        >
          <div
            className={classes(eventColors[selected || data.eventColorId].className, 'text-xl text-center')}
          >
            <i className="fa-solid fa-circle"></i>
          </div>
          <div className="absolute inset-0 flex justify-end items-center pr-3">
            <ChevronDownIcon
              className="size-5 fill-black/50"
            />
          </div>

        </ListboxButton>
        <ListboxOptions
          anchor={"bottom"}
          transition
          className={classes(
            'z-10 w-[5rem] rounded-xl border border-white/5 bg-white p-1 focus:outline-none',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {Object.keys(eventColors).map(ec => {
            const color = eventColors[ec]

            return (
              <ListboxOption
                value={ec}
                key={ec}
              >
                <div
                  className={classes(color.className, 'rounded-full text-xl text-center my-4 cursor-pointer')}
                >
                  <i className="fa-solid fa-circle"></i>
                </div>
              </ListboxOption>
            )
          })}
        </ListboxOptions>
      </Listbox>

      <button
        type="button"
        onClick={handleForm}
        className="bg-rose-800 text-white text-base px-4 py-2 font-bold"
      >Guardar</button>
    </div>
  )
}

export default PreferencesTab
