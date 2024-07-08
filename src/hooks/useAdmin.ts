import { getAdmin } from "@/api/authAPI"
import { useQuery } from "@tanstack/react-query"

const useAdmin = () => {
  const queryData = useQuery({
    queryKey: ['admin'],
    queryFn: getAdmin,
    refetchOnWindowFocus: false,
    retry: 1
  })

  return queryData
}

export default useAdmin