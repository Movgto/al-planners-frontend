import { RangeAvailability } from "@/components/users/schedule/ScheduleModal"
import { Availability, Event, EventType } from "../types"
import { useMemo } from "react"

type UseAvailabilityParams = {
  availableTimes: Availability[] | undefined
  et: EventType
  events: Event[] | undefined
}

const useAvailability = ({availableTimes, et, events} : UseAvailabilityParams) => { 
  const availability = useMemo(() => {
    let rangeAvailable: RangeAvailability = []
    const avail: RangeAvailability[] = []

    if (!availableTimes || !availableTimes.length || !et || !events) {
      console.log('Devolviendo arreglo de rangos vacio desde availability funcion')
      return avail
    }

    for (const a of availableTimes) {
      console.log(new Date(a.startTime).getHours())
      console.log(new Date(a.endTime).getHours())

      const startTime = new Date(a.startTime).getHours()
      const endTime = new Date(a.endTime).getHours()
      const absDiff = Math.abs(startTime - endTime)

      if (absDiff < 1) continue

      rangeAvailable = []

      for (let i = startTime; i <= endTime;) {
        const startHour = i
        const endHour = i + et.duration

        if (endHour > endTime) break          

        rangeAvailable = [startHour, endHour]

        for (const e of events) {
          const eStartHour = new Date(e.start.dateTime).getHours()
          const eEndHour = new Date(e.end.dateTime).getHours()

          // Si el nuevo evento se encuentra fuera del tiempo de otros eventos existentes...
          if ((startHour < eStartHour && endHour <= eStartHour) ||
            (startHour >= eEndHour && endHour > eEndHour)) {
            // entonces continua checando más eventos
          } else {
            // sino vacia el actual rango y termina las iteraciones
            rangeAvailable = []
            break
          }
        }

        // si el rango esta vacío significa que hubo un conflicto con el tiempo de otro evento        
        if (!rangeAvailable.length) {
          // Entonces se debe terminar este ciclo e incrementar i en uno para buscar en la hora siguiente
          i += 1
        } else {
          // si no está vacio significa que no hubo conflictos y se puede añadir el rango a la lista de disponibilidad
          // entonces se incrementa i la cantidad de la duración del nuevo evento, ya que estará ahora ocupado
          avail.push(rangeAvailable)
          i += et.duration
        }
      }
    }
    console.log('====== Tiempos de disponibilidad para nueva cita ======')
    console.log(avail)    

    return avail
  }, [availableTimes, events, et])

  return availability
}

export default useAvailability