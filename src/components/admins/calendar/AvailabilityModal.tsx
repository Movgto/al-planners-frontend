import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useSelectedDate } from "@/hooks/index"
import { useMutation } from "@tanstack/react-query"
import { createAvailableTime } from "@/api/calendarAPI"
import { toast } from "react-toastify"
import { AvailabilityFormData } from "@/types/index"
import { getDateInTimezone } from "@/utils/index"
import ErrorMessage from "@/components/ErrorMessage"

const AvailabilityModal = () => {

  const selectedDate = useSelectedDate()

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const createAvailability = searchParams.get('createAvailability')

  const show = !!createAvailability  

  const handleClose = () => {
    navigate(location.pathname, { replace: true })
  }

  const defaultValues = {
    startTime: 0,
    endTime: 0
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues})

  const { mutate } = useMutation({
    mutationFn: createAvailableTime,
    onError: error => toast.error(error.message),
    onSuccess: data => {
      toast.success(data)
      reset()
    }
  })

  const handleForm = (formData: typeof defaultValues) => {

    selectedDate.setHours(0, 0, 0, 0)
    
    const availableTime : AvailabilityFormData = {
      startTime: getDateInTimezone(selectedDate.setHours(formData.startTime)),
      endTime: getDateInTimezone(selectedDate.setHours(formData.endTime)),
    }

    mutate(availableTime)
    
    console.log(availableTime)
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
                  className='flex flex-col gap-2'
                >
                  <label htmlFor="startTime">Inicio</label>
                  <input
                    type="number"
                    id="startTime"
                    className='ring-1 ring-slate-300 rounded-sm p-1'
                    {...register('startTime',
                      {
                        required: 'Este campo es requerido',
                        valueAsNumber: true,
                        validate: {
                          min: val => {
                            if (+val < 0) return 'El valor debe ser mínimo 0'
                          },
                          max: val => {
                            if (+val > 23) return 'El valor debe ser máximo 23'
                          }
                        }
                      }
                    )}
                  />
                  {errors.startTime && errors.startTime.message && (
                    <ErrorMessage message={errors.startTime.message} />
                  )}
                </div>
                <div
                  className='flex flex-col gap-2'
                >
                  <label htmlFor="endTime">Final</label>
                  <input
                    type="number"
                    id="endTime"
                    className='ring-1 ring-slate-300 rounded-sm p-1'
                    {...register('endTime',
                      {
                        required: 'Este campo es requerido',
                        valueAsNumber: true,
                        validate: {
                          min: val => {
                            if (+val < 0) return 'El valor debe ser mínimo 0'
                          },
                          max: val => {
                            if (+val > 23) return 'El valor debe ser máximo 23'
                          }
                        }
                      }
                    )}
                  />
                  {errors.endTime && errors.endTime.message && (
                    <ErrorMessage message={errors.endTime.message} />
                  )}
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
