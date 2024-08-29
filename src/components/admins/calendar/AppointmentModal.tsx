import { getEvent } from "@/api/calendarAPI"
import { dateFormater, formatHour } from "@/utils/index"
import { DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { Dialog } from "@headlessui/react"
import { DialogTitle } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Fragment } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AppointmentModal = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const seeAppoint = searchParams.get('seeAppoint')
  const navigate = useNavigate()

  const show = !!seeAppoint

  const handleClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const { data } = useQuery({
    queryKey: ['calendarEvent', seeAppoint],
    queryFn: () => getEvent(seeAppoint!),
    enabled: show,
    refetchOnWindowFocus: false
  })

  if (data) return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <TransitionChild
          enterFrom="opacity-0"
          enterTo="opacity-100"
          enter="ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          leave="ease-in duration-300"
        >
          <div
            className="fixed inset-0 bg-black/60"
          >
          </div>
        </TransitionChild>

        <div
          className="fixed inset-0 overflow-y-auto"
        >
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              enter="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
              leave="ease-in duration-300"
            >
              <DialogPanel
                className="w-full max-w-4xl rounded-2xl
                          flex flex-col gap-4 bg-white
                          items-center shadow-xl p-16"
              >
                <DialogTitle>
                  <h3
                    className="font-bold text-2xl text-center"
                  >
                    Detalles de Cita
                  </h3>
                </DialogTitle>
                <p
                  className="text-slate-500 font-bold flex gap-4"
                >
                  <span>{dateFormater(data.start.dateTime)}</span>
                  <span>
                    {formatHour(data.start.dateTime)}{' - '}
                    {formatHour(data.end.dateTime)}
                  </span>

                </p>

                <p
                  className="flex gap-4 items-center text-xl text-rose-800 font-bold"
                >
                  {data.summary}
                </p>

                {data.attendees.map((at, idx) => (
                  <div
                    className="flex flex-col gap-2 text-left w-full text-xl"
                  >
                    <p
                      className="flex justify-between"
                    >
                      <span
                        className="font-bold"
                      >Nombre de participante {idx + 1}:</span> <span>{at.name}</span>
                    </p>
                    <p
                      className="flex justify-between"
                    >
                      <span
                        className="font-bold"
                      >Correo electrónico de participante:</span> <span>{at.email}</span>
                    </p>
                  </div>
                ))}            
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AppointmentModal
