import { AppointmentTabOption, appointmentTabOptions } from "@/types/index"
import { useState } from "react"
import SeeAppointmentsOption from "@/components/admins/calendar/SeeAppointmentsOption"
import EventTypesOption from "./EventTypesOption"

const AppointmentMenu = () => {
  const [option, setOption] = useState<AppointmentTabOption>('Inicio')

  const handleClick = (op : AppointmentTabOption) => {
    setOption(op)
  }

  if (option === 'Inicio') return (
    <ul
      className="flex flex-col gap-2 p-4"
    >
      {appointmentTabOptions.filter(val => val !== 'Inicio').map(op => (
        <li>
          <button
            type="button"
            onClick={() => handleClick(op)}
            className="bg-cyan-700 text-white font-bold py-2 min-w-80 hover:bg-cyan-500 hover:cursor-pointer"
          >{op}</button>          
        </li>
      ))}
    </ul>
  )

  if (option === 'Tipos de Cita') return (
    <EventTypesOption setOption={setOption} />
  )

  if (option === 'Ver Citas') return (
    <SeeAppointmentsOption setOption={setOption} />
  )
}

export default AppointmentMenu
