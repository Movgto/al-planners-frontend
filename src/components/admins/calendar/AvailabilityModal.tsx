import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useSelectedDate } from "@/hooks/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAvailableTime } from "@/api/calendarAPI"
import { toast } from "react-toastify"
import { AvailabilityFormData, dayTimes } from "@/types/index"
import { getDateInTimezone } from "@/utils/index"

const hourArray: number[] = []
for (let i = 1; i <= 12; i++) {
  hourArray.push(i);
}

const AvailabilityModal = () => {

  const selectedDate = useSelectedDate()

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const createAvailability = searchParams.get('createAvailability')

  const show = !!createAvailability

  const queryClient = useQueryClient()

  const defaultValues = {
    startTime: '',
    startTimeAmPm: 'am',
    endTime: '',
    endTimeAmPm: 'am'
  }

  const { register, handleSubmit, reset } = useForm({ defaultValues })

  const { mutate } = useMutation({
    mutationFn: createAvailableTime,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data)
      reset()
      queryClient.invalidateQueries({ queryKey: ['availableTimes'] })
      navigate(location.pathname)
    }
  })  

  const get24Hour = (hour: string, dayTime: string) => {
    switch (dayTime) {
      case 'am':
        if (hour === '12') return 0
        return +hour
      case 'pm':
        if (hour === '12') return +hour

        return +hour + 12
    }

    return -1
  }

  const handleForm = (formData: typeof defaultValues) => {

    selectedDate.setHours(0, 0, 0, 0)

    const availableTime: AvailabilityFormData = {
      startTime: getDateInTimezone(selectedDate.setHours(get24Hour(formData.startTime, formData.startTimeAmPm))),
      endTime: getDateInTimezone(selectedDate.setHours(get24Hour(formData.endTime, formData.endTimeAmPm)))
    }

    mutate(availableTime)

    console.log(availableTime)
  }

  const handleClose = () => {
    reset()
    navigate(location.pathname, { replace: true })
  }

  return (
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
          ></div>
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              className="w-full max-w-4xl rounded-2xl
                          flex flex-col gap-4 bg-white
                          items-center shadow-xl p-16"
            >
              <DialogTitle>
                <h3
                  className="font-bold text-2xl text-center"
                >Crear Tiempo de Disponibilidad</h3>
              </DialogTitle>

              <form
                noValidate
                className='flex flex-col gap-2'
                onSubmit={handleSubmit(handleForm)}
              >
                <div
                  className='flex flex-col gap-2 items-center'
                >
                  <h3
                    className="text-lg font-bold text-slate-700"
                  >Hora de inicio</h3>
                  <div
                    className="flex gap-2"
                  >

                    <div
                      className="flex flex-col gap-2"
                    >
                      <select
                        id="startTime"
                        defaultValue={""}
                        {...register('startTime', {
                          required: 'Este campo es obligatorio'
                        })}
                      >
                        <option value="" hidden>--:--</option>
                        {hourArray.map(hour => (
                          <option value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="flex flex-col gap-2"
                    >
                      <select
                        id="startTimeAmPm"
                        {...register('startTimeAmPm', {
                          required: 'Este campo es obligatorio'
                        })}
                      >
                        {dayTimes.map(dt => (
                          <option value={dt}>{dt.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className='flex flex-col gap-2 items-center'
                >
                  <h3
                    className="text-lg font-bold text-slate-700"
                  >Hora final</h3>
                  <div
                    className="flex gap-2"
                  >

                    <div
                      className="flex flex-col gap-2"
                    >
                      <select
                        id="endTime"
                        defaultValue={""}
                        {...register('endTime', {
                          required: 'Este campo es obligatorio'
                        })}
                      >
                        <option value={""} hidden defaultChecked>--:--</option>
                        {hourArray.map(hour => (
                          <option value={hour}>{hour.toString().padStart(2, '0')}:00</option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="flex flex-col gap-2"
                    >
                      <select
                        id="endTimeAmPm"
                        {...register('endTimeAmPm', {
                          required: 'Este campo es obligatorio'
                        })}
                      >
                        {dayTimes.map(dt => (
                          <option value={dt}>{dt.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>                

                <input
                  type="submit"
                  className="bg-cyan-700 text-white uppercase font-bold hover:cursor-pointer hover:bg-cyan-500 p-2"
                  value="Abrir tiempo de disponibilidad"
                />
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AvailabilityModal
