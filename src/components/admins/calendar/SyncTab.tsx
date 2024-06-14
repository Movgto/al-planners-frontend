import { getAuthURL } from "@/api/calendarAPI"
import { useQuery } from "@tanstack/react-query"

const SyncTab = () => {
  const {data} = useQuery({
    queryKey: ['authURL'],
    queryFn: getAuthURL
  })

  const handleClick = () => {
    if (!data) {
      console.log('Auth url is not present')
      return
    }
    window.open(data.url, '_self')
  }

  return (
    <div
      className="flex flex-col items-center justify-center p-2 gap-4 h-full"
    >
      <h2
        className="font-bold text-blue-800 text-justify"
      >
        Envíe los eventos y disponibilidad al calendario de Google
      </h2>

      <button
        type="button"
        className="bg-teal-800 px-2 py-4 text-white font-bold"
        onClick={handleClick}
      >
        Sincronizar
      </button>
    </div>
  )
}

export default SyncTab
