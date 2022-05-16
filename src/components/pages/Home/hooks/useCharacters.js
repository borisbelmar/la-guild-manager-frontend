import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useAuth } from '../../../context/AuthContext'
import getCharacterService from '../../../../services/characterService'

export default function useCharacters () {
  const { token } = useAuth()
  const { data, isLoading } = useQuery('user-characters', {
    queryFn: async () => {
      const res = await getCharacterService(token).getMyCharacters()
      return res.data
    },
    onError: () => {
      toast('Unknown error', {
        type: 'error'
      })
    }
  })
  return {
    data,
    isLoading
  }
}