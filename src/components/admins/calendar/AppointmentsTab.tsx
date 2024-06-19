import { getEventTypes } from "@/api/calendarAPI"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AppointmentMenu from "@/components/admins/calendar/AppointmentMenu"

const AppointmentsTab = () => {

    const navigate = useNavigate()

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ['eventTypes'],
        queryFn: getEventTypes,        
    })

    if (isLoading) {
        return 'Cargando tipos de evento'
    }

    if (isError && error) {
        toast.error(error.message)
    }

    if (data && !data.length) return (
        <div
            className="flex flex-col p-4 gap-4"
        >
            <h2
                className="text-lg text-slate-700 font-bold"
            >Aun no existen tipos de cita, crea uno primero antes de agregar citas</h2>

            <button
                type="button"
                className="bg-rose-700 text-white font-semibold px-2 py-4 hover:bg-rose-500 hover:cursor-pointer"
                onClick={() => navigate('?createEventType=true')}
            >
                Crear Tipo de Cita
            </button>
        </div>
    )

    if (data && data.length) return (
        <AppointmentMenu />
    )    
}

export default AppointmentsTab