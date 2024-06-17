import { getEventTypes } from "@/api/calendarAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const hours = () => {
    const hoursArray = []

    for(let i = 0; i <= 24; i++) {
        hoursArray.push(i)
    }

    return hoursArray
}

const defaultValues = {
    summary: '',
    startTime: '',
    endTime: ''
}

const AppointmentsTab = () => {

    const navigate = useNavigate()

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ['eventTypes'],
        queryFn: getEventTypes,        
    })

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues})

    const handleForm = (formData: typeof defaultValues) => {
        console.log(formData)
    }

    if (isLoading) {
        return 'Cargando tipos de evento'
    }

    if (isError && error) {
        toast.error(error.message)
    }

    if (data && !data.length) return (
        <div
            className="flex flex-col items-center p-4 gap-4"
        >
            <h2
                className="text-lg text-slate-700 font-bold"
            >Aun no existen tipos de cita, crea uno primero antes de agregar citas</h2>

            <button
                className="bg-rose-700 text-white font-semibold px-2 py-4 hover:bg-rose-500 hover:cursor-pointer"
                onClick={() => navigate('?createEventType=true')}
            >
                Crear Tipo de Cita
            </button>
        </div>
    )

    if (data && data.length) return (
        <div
            className="flex flex-col items-center p-4 gap-4"
        >
            <h2
                className="text-lg text-slate-700 font-bold"
            >Anade o elimina citas</h2>

            <form
                className="flex flex-col gap-2"
                noValidate
                onSubmit={handleSubmit(handleForm)}
            >
                <div
                    className="flex flex-col gap-2"
                >
                    <label
                        htmlFor="summary"
                        className="text-slate-600 font-semibold"
                    >Titulo</label>
                    <input
                        type="text"
                        id="summary"
                        className="border border-slate-400 rounded-md px-2 py-1"
                        {...register('summary',{
                            required: 'Este campo es obligatorio'
                        })}
                        />
                        {errors.summary && errors.summary.message && (
                            <ErrorMessage
                                message={errors.summary.message}
                            />
                        )}
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <label
                        htmlFor="startTime"
                        className="text-slate-600 font-semibold"
                    >Hora de inicio</label>
                    <select
                        id="startTime"
                        defaultValue=""
                        {...register('startTime', {
                            required: 'Este campo es obligatorio',
                            validate: {
                                min: val => {
                                    if (+val < 0) return 'El valor no puede ser menor que 0'
                                },
                                max: val => {
                                    if (+val > 24) return 'El valor no puede ser mayor que 24'
                                }
                            }
                        })}
                    >
                        <option disabled value='' hidden>Seleccione una hora</option>
                        {hours().map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {errors.startTime && errors.startTime.message && (
                        <ErrorMessage
                            message={errors.startTime.message}
                        />
                    )}
                </div>
                <div
                    className="flex flex-col gap-2"
                >
                    <label
                        htmlFor="endTime"
                        className="text-slate-600 font-semibold"
                    >Hora de cierre</label>
                    <select
                        id="endTime"
                        defaultValue=""
                        {...register('endTime', {
                            required: 'Este campo es obligatorio',
                            validate: {
                                min: val => {
                                    if (+val < 0) return 'El valor no puede ser menor que 0'
                                },
                                max: val => {
                                    if (+val > 24) return 'El valor no puede ser mayor que 24'
                                }
                            }
                        })}
                    >
                        <option disabled value='' hidden>Seleccione una hora</option>
                        {hours().map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    {errors.endTime && errors.endTime.message && (
                        <ErrorMessage
                            message={errors.endTime.message}
                        />
                    )}
                </div>

                <input
                    type="submit"
                    value="Agregar Cita"
                    className="bg-rose-700 text-white font-bold px-4 py-2 hover:bg-rose-500 hover:cursor-pointer"                    
                />
            </form>
        </div>
    )
}

export default AppointmentsTab