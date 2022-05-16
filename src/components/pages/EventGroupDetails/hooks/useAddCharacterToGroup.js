import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import getCharacterService from "../../../../services/characterService"
import getEventGroupService from "../../../../services/eventGroupService"
import { useAuth } from "../../../context/AuthContext"

export default function useAddCharacterToGroup (eventGroupId, { onSuccess }) {
  const { token } = useAuth()
  const { data: characters, isLoading: charsLoading } = useQuery('user-characters', {
    queryFn: async () => {
      const res = await getCharacterService(token).getMyCharacters()
      return res.data
    }
  })

  const { mutateAsync: addCharacter, isLoading: addCharLoading } = useMutation({
    mutationKey: ['character', 'add'],
    mutationFn: async payload => {
      const service = getEventGroupService(token)
      const res = await service.addCharacterToEventGroup(eventGroupId, payload.character)
      return res.data
    },
    onSuccess
  })

  const { register, handleSubmit } = useForm()
  
  return {
    characters,
    addCharacter: handleSubmit(addCharacter),
    register,
    isLoading: charsLoading || addCharLoading
  }
}