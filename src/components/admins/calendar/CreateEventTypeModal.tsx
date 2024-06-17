import ErrorMessage from "@/components/ErrorMessage"
import { EventTypeFormData } from "@/types/index"
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react"
import { DialogTitle } from "@mui/material"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

const defaultValues : EventTypeFormData = {
    name: '',
    duration: 0
}

const CreateEventTypeModal = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const createEventType = searchParams.get('createEventType')

  const show = !!createEventType

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues})

  const handleForm = (formData: EventTypeFormData) => {
    console.log(formData)
  }

  return (
    <>
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-50"
                        >
                            <DialogPanel
                                className="w-full max-w-4xl flex flex-col gap-4
                                            rounded-2xl bg-white items-center
                                            shadow-xl p-16"
                                
                            >
                                <DialogTitle>
                                    <h3
                                        className="font-bold text-2xl text-center"
                                    >Crear Tipo de Cita</h3>
                                </DialogTitle>

                                <form
                                    className="flex flex-col gap-4 w-full text-left"
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                >
                                    <div
                                        className="flex flex-col gap-2"
                                    >
                                        <label
                                            htmlFor="name"
                                            className="text-xl font-bold text-slate-600"
                                        >Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="border border-slate-400 rounded-md p-2"
                                            {...register('name', {
                                                required: 'Este campo es obligatorio'
                                            })}
                                        />
                                        {errors.name && errors.name.message && (
                                            <ErrorMessage
                                                message={errors.name.message}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="flex flex-col gap-2"
                                    >
                                        <label
                                            htmlFor="duration"
                                            className="text-xl font-bold text-slate-600"
                                        >Duracion</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            className="border border-slate-400 rounded-md p-2"
                                            {...register('duration', {
                                                required: 'Este campo es obligatorio',
                                                min: 0,
                                                max: 24
                                            })}
                                        />
                                        {errors.duration && errors.duration.message && (
                                            <ErrorMessage
                                                message={errors.duration.message}
                                            />
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-rose-700 text-white font-bold uppercase py-4 hover:bg-rose-500 hover:cursor-pointer"
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
)
}

export default CreateEventTypeModal