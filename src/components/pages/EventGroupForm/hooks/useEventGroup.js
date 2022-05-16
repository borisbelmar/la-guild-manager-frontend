import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import getEventGroupService from '../../../../services/eventGroupService'
import { useAuth } from '../../../context/AuthContext'

export default function useEventGroup(id) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(['event-group', id], {
    queryFn: async () => {
      const res = await getEventGroupService(token).getEventGroupById(id)
      return res.data
    },
    onError: (err) =>{
      if (err.response?.status === 404) {
        toast('EventGroup not found', {
          type: 'error'
        })
        navigate('/404')
        return
      }
      toast(err.response?.data?.message || err.message, {
        type: 'error'
      })
    },
    enabled: !!token && !!id
  })

  return {
    data,
    isLoading
  }
}