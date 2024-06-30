import { createEvent, getEventType } from "@/api/calendarAPI"
import { useSelectedDate } from "@/hooks/index"
import { ClientEventFormData, EventFormData } from "@/types/index"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Fragment, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ScheduleForm from "./ScheduleForm"
import { useForm } from "react-hook-form"
import { dateInTimezone, formatHourNum } from "@/utils/index"

export type RangeAvailability = [number?, number?]

const ScheduleModal = () => {

  const [newEventTime, setNewEventTime] = useState<RangeAvailability>([])

  const navigate = useNavigate()

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const eventType = searchParams.get('eventType')

  const show = !!eventType

  const date = useSelectedDate()

  const queryClient = useQueryClient()

  const { data: et, isError, error } = useQuery({
    queryKey: ['eventType', eventType],
    queryFn: () => getEventType(eventType!),
    enabled: !!eventType
  })

  const { data: availability } = useQuery({
    queryKey: ['availability', date.toISOString() + eventType],
    queryFn: () => {
      return queryClient.getQueryData<RangeAvailability[]>(['availability', date.toISOString() + et!._id])
    },
    enabled: !!eventType
  })

  const handleClick = (range: RangeAvailability) => {
    setNewEventTime(range)
    console.log('====== Selected range ======')
    console.log(range)
  }

  const { mutate } = useMutation({
    mutationFn: createEvent,
    onError: error => toast.error(error.message),
    onSuccess: () => {
      navigate(location.pathname)
      setNewEventTime([])
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] })
      toast.success('La cita se ha programado exitosamente!')
    }
  })

  const defaultValues: ClientEventFormData = {
    name: '',
    email: ''
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

  const handleForm = (formData: ClientEventFormData) => {
    if (!et) return

    const copyDate = dateInTimezone(new Date(date))

    copyDate.setHours(0, 0, 0, 0)

    const start = dateInTimezone(new Date(copyDate.setHours(newEventTime[0]!)))
    const end = dateInTimezone(new Date(copyDate.setHours(newEventTime[1]!)))

    const newEvent: EventFormData = {
      summary: et.name,
      start: {
        dateTime: start.toISOString()
      },
      end: {
        dateTime: end.toISOString()
      },
      sentToCalendar: false,
      attendee: formData
    }

    mutate(newEvent)
    console.log(formData)
    reset()
  }

  const handleClose = () => {
    setNewEventTime([])
    reset()
    navigate(location.pathname, { replace: true })
  }

  if (isError && error) {
    toast.error(error.message)
  }

  if (newEventTime.length) return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" onClose={handleClose} className="relative z-10">
        <TransitionChild>
          <div
            className="fixed inset-0 bg-black/60"
          ></div>
        </TransitionChild>
        <div
          className="fixed inset-0 flex justify-center items-center p-2"
        >
          <DialogPanel
            className="px-4 py-5 bg-white shadow-2xl rounded-2xl w-full max-w-3xl
                      flex flex-col gap-4 items-center"
          >
            <button
              type="button"
              className="bg-rose-800 hover:bg-rose-600 text-white px-6 py-2 font-bold text-xl"
              onClick={() => setNewEventTime([])}
            >Volver</button>
            <form
              noValidate
              className="flex flex-col gap-4 w-full"
            >
              <ScheduleForm register={register} errors={errors} />
              <input
                type="submit"
                className="bg-sky-500 hover:bg-sky-300 text-white font-bold text-xl px-6 py-2 hover:cursor-pointer"
                onClick={handleSubmit(handleForm)}
                value="Agendar"
              />
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  )

  if (et && date && availability) return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" onClose={handleClose} className="relative z-10">
        <TransitionChild
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          enter="ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          leave="ease-in duration-300"
        >
          <div
            className="fixed inset-0 bg-black/60"
          ></div>
        </TransitionChild>
        <div
          className="fixed inset-0 flex justify-center items-center p-2"
        >
          <TransitionChild
            as={Fragment}
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            enter="ease-out duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            leave="ease-in duration-300"
          >
            <DialogPanel
              className="px-4 py-5 bg-white shadow-2xl rounded-2xl w-full max-w-5xl
                      flex flex-col gap-4 items-center"
            >
              <h2
                className="text-2xl font-extrabold text-slate-700 text-center"
              >Hora de la cita</h2>
              <p
                className="text-center text-slate-500 font-bold"
              >Elige una hora para programar la cita {et.name} ({et.duration}hrs)</p>
              <ul
                className="flex flex-col gap-4 w-full items-center max-w-80"
              >
                {availability.map(a => (
                  <li
                    className="w-full"
                    key={a[0]! + a[1]!}
                  >
                    <button
                      className=" bg-sky-600 hover:bg-sky-400 text-white p-2 rounded-lg w-full"
                      type="button"
                      onClick={() => handleClick(a)}
                    >{formatHourNum(a[0]!)} - {formatHourNum(a[1]!)}</button>
                  </li>
                ))}
              </ul>

            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ScheduleModal
