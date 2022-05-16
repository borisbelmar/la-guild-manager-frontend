import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from "yup"
import getEventGroupService from '../../../../services/eventGroupService'
import { useAuth } from '../../../context/AuthContext'

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  type: yup.string().required(),
  startAt: yup.date().required()
}).required()

export default function useEventGroupCreation({ currentEventGroup }) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutateAsync: saveEventGroup, isLoading: isLoadingSaving } = useMutation({
    mutationKey: ['event-group', currentEventGroup ? currentEventGroup._id : null],
    mutationFn: async payload => {
      const service = getEventGroupService(token)
      if (currentEventGroup) {
        const res = await service.updateEventGroup(currentEventGroup._id, payload)
        return res.data
      }
      const res = await service.createEventGroup(payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('next-event-groups')
      queryClient.invalidateQueries(['event-group', currentEventGroup?._id])
      toast.success('EventGroup created successfully')
      navigate('/')
    },
    onError: (err) => {
      console.error(err)
      toast(err.response?.data?.message || err.message, { type: 'error' })
    }
  })

  const { mutateAsync: removeEventGroup, isLoading: isLoadingRemoving } = useMutation({
    mutationKey: ['event-group', currentEventGroup?._id],
    mutationFn: async () => {
      const service = getEventGroupService(token)
      const res = await service.deleteEventGroup(currentEventGroup?._id)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries('next-event-groups')
      toast.success('EventGroup removed successfully')
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
      title: currentEventGroup?.title,
      description: currentEventGroup?.description,
      type: currentEventGroup?.type,
      startAt: currentEventGroup?.startAt
    }
  })

  return {
    register,
    formErrors: errors,
    isLoading: isLoadingSaving || isLoadingRemoving,
    handleRemove: removeEventGroup,
    handleSave: handleSubmit(saveEventGroup)
  }
}