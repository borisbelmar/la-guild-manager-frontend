import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from "yup"
import getCharacterService from '../../../../services/characterService'
import getGuildService from '../../../../services/guildService'
import { useAuth } from '../../../context/AuthContext'

const schema = yup.object({
  name: yup.string().required(),
  ilvl: yup.number().positive().required(),
  isAlter: yup.boolean(),
  class: yup.string().required(),
  guild: yup.string()
}).required()

export default function useCharacterCreation({ currentCharacter }) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data } = useQuery('guilds', {
    queryFn: async () => {
      const res = await getGuildService(token).getAllGuilds()
      return res.data
    }
  })

  const { mutateAsync: saveCharacter, isLoading: isLoadingSaving } = useMutation({
    mutationKey: ['character', currentCharacter ? currentCharacter._id : null],
    mutationFn: async payload => {
      const service = getCharacterService(token)
      if (currentCharacter) {
        const res = await service.updateCharacter(currentCharacter._id, {
          ...payload,
          guild: payload.guild || null
        })
        return res.data
      }
      const res = await service.createCharacter({
        ...payload,
        guild: payload.guild || null
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('user-characters')
      queryClient.invalidateQueries(['character', currentCharacter?._id])
      toast.success('Character created successfully')
      navigate('/')
    },
    onError: (err) => {
      console.error(err)
      toast(err.response?.data?.message || err.message, { type: 'error' })
    }
  })

  const { mutateAsync: removeCharacter, isLoading: isLoadingRemoving } = useMutation({
    mutationKey: ['character', currentCharacter?._id],
    mutationFn: async () => {
      const service = getCharacterService(token)
      const res = await service.deleteCharacter(currentCharacter?._id)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('user-characters')
      toast.success('Character removed successfully')
      navigate('/')
    },
    onError: (err) => {
      console.error(err)
      toast(err.response?.data?.message || err.message, { type: 'error' })
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentCharacter?.name,
      ilvl: currentCharacter?.ilvl,
      isAlter: currentCharacter?.isAlter,
      class: currentCharacter?.class,
      guild: currentCharacter?.guild?._id
    }
  })

  return {
    register,
    guilds: data,
    formErrors: errors,
    isLoading: isLoadingSaving || isLoadingRemoving,
    handleRemove: removeCharacter,
    handleSave: handleSubmit(saveCharacter)
  }
}