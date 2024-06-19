import { CalendarDate, CalendarFormData } from '@/types/index'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

const AvailabilityTab = () => {

  const queryClient = useQueryClient()

  const defaultValues : CalendarFormData = {
    startTime: -1,
    endTime: -1
  }

  const {register, handleSubmit} = useForm({defaultValues})

  const handleForm = (formData: CalendarFormData) => {

    const date = queryClient.getQueryData<CalendarDate>(['selectedDate'])

    if (!date) return

    console.log({
      startTime: formData.startTime,
      endTime: formData.endTime,
      date
    })
  }
  return (
    <div
      className="flex flex-col p-4 gap-4"
    >
      <p
        className="text-slate-700 text-center"
      >Establece las horas de disponibilidad para citas este dia</p>

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
                min: 0,
                max: 24
              }
            )}
          />
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
                min: 0,
                max: 24
              }
            )}
          />
        </div>
        <input
          type="submit"            
          className="bg-cyan-700 text-white uppercase font-bold hover:cursor-pointer hover:bg-cyan-500 p-2"
          value="Abrir tiempo de disponibilidad"
        />
      </form>
    </div>
  )
}

export default AvailabilityTab
