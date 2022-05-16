import { useQuery } from "react-query";
import getEventGroupService from "../../../../../../services/eventGroupService";
import { useAuth } from "../../../../../context/AuthContext";

export default function useNextEventGroups () {
  const { token } = useAuth()
  
  const { data, isLoading } = useQuery('event-groups', {
    queryFn: async () => {
      const res = await getEventGroupService(token).getAllEventGroups()
      return res.data
    }
  })

  return {
    data,
    isLoading
  }
}