import { useMutation } from 'react-query'
import getEventGroupService from '../../../../services/eventGroupService'
import { useAuth } from '../../../context/AuthContext'

export default function useRemoveCharacterFromGroup (eventGroupId, characterId) {
  const { token } = useAuth()
  const { mutateAsync: removeCharacter, isLoading } = useMutation({
    mutationKey: ['character', 'remove'],
    mutationFn: async () => {
      const service = getEventGroupService(token)
      const res = await service.removeCharacterFromEventGroup(eventGroupId, characterId)
      return res.data
    }
  })

  return {
    removeCharacter,
    isLoading
  }
}