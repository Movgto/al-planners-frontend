import { adminLogin } from "@/api/authAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { LoginFormData } from "@/types/auth"
import { emailRegex } from "@/utils/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const defaultValues : LoginFormData = {
  email: '',
  password: ''
}

const AdminsLoginView = () => {

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: adminLogin,
    onError: error => toast.error(error.message),
    onSuccess: () => {      
      reset()
      navigate('/admins')
    }
  })

  const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues})

  const handleForm = (formData: LoginFormData) => {
    mutate(formData)
  }

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-2xl p-4 gap-4"
    >
      <h3
        className="font-semibold text-justify self-center"
      >Si tienes una cuenta de administrador ingresa tus datos para entrar</h3>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleForm)}
      >
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="email"
            className="font-bold text-lg"
          >Correo</label>
          <input
            type="text"
            id="email"
            className="border border-slate-400 rounded-lg"
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: emailRegex,
                message: 'El correo no es válido'
              }           
            })}
          />
          {errors.email && errors.email.message && (
            <ErrorMessage message={errors.email.message} />
          )}
        </div>
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="password"
            className="font-bold text-lg"
          >Contraseña</label>
          <input
            type="password"
            id="password"
            className="border border-slate-400 rounded-lg"
            {...register('password', {
              required: 'Este campo es obligatorio'
            })}
          />
          {errors.password && errors.password.message && (
            <ErrorMessage message={errors.password.message} />
          )}
        </div>

        <input
          type="submit"
          className="bg-rose-800 text-white text-lg font-bold px-4 py-2
                    hover:bg-rose-600 hover:cursor-pointer"
          value="Entrar"                    
        />
      </form>
    </div>
  )
}

export default AdminsLoginView
