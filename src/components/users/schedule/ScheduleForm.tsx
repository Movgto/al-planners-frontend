import ErrorMessage from "@/components/ErrorMessage"
import { ClientEventFormData } from "@/types/index"
import { FieldErrors, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<ClientEventFormData>
  errors: FieldErrors<ClientEventFormData>
}

const ScheduleForm = ({ register, errors }: Props) => {

  return (
    <>
      <h3
        className="text-2xl text-slate-700 font-bold"
      >Quienes se casan?</h3>

      <div
        className="flex flex-col gap-2 w-full pl-4"
      >
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="name1"
            className="text-xl text-slate-600 font-bold"
          >Nombre Completo 1</label>
          <input
            id="name1"
            type="text"
            className="border border-slate-400 rounded-xl p-2"
            {...register('name1', {
              required: 'Este campo es obligatorio'
            })}
          />
          {errors.name1 && errors.name1.message && (
            <ErrorMessage message={errors.name1.message} />
          )}
        </div>
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="name2"
            className="text-xl text-slate-600 font-bold"
          >Nombre Completo 2</label>
          <input
            id="name2"
            type="text"
            className="border border-slate-400 rounded-xl p-2"
            {...register('name2', {
              required: 'Este campo es obligatorio'
            })}
          />
          {errors.name2 && errors.name2.message && (
            <ErrorMessage message={errors.name2.message} />
          )}
        </div>
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
