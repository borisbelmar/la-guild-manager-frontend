import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import getCharacterService from '../../../../services/characterService'
import { useAuth } from '../../../context/AuthContext'

export default function useCharacter(id) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(['character', id], {
    queryFn: async () => {
      const res = await getCharacterService(token).getCharacterById(id)
      return res.data
    },
    onError: (err) =>{
      if (err.response?.status === 404) {
        toast('Character not found', {
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