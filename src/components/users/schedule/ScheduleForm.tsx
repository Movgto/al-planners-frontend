import ErrorMessage from "@/components/ErrorMessage"
import { ClientEventFormData } from "@/types/index"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<ClientEventFormData>
  errors: FieldErrors<ClientEventFormData>  
}

const ScheduleForm = ({register, errors} : Props) => {

  return (
    <>
      <div
        className="flex flex-col gap-2 w-full"
      >
        <label
          htmlFor="name"
          className="text-xl text-slate-600 font-bold"
        >Tu nombre</label>
        <input
          id="name"
          type="text"
          className="border border-slate-400 rounded-xl p-2"
          {...register('name', {
            required: 'Este campo es obligatorio'
          })}
        />
        {errors.name && errors.name.message && (
          <ErrorMessage message={errors.name.message} />
        )}
      </div>
      <div
        className="flex flex-col gap-2 w-full"
      >
        <label
          htmlFor="email"
          className="text-xl text-slate-600 font-bold"
        >Correo electrónico</label>
        <input
          id="email"
          type="email"
          className="border border-slate-400 rounded-xl p-2"
          {...register('email', {
            required: 'Este campo es obligatorio'
          })}
        />
        {errors.email && errors.email.message && (
          <ErrorMessage message={errors.email.message} />
        )}
      </div>
    </>
  )
}

export default ScheduleForm
