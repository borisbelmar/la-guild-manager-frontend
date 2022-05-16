import axios from 'axios'
import { EVENT_GROUPS_SERVICE } from '../config/env'

const getEventGroupClient = token => axios.create({
  baseURL: EVENT_GROUPS_SERVICE,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default function getEventGroupService (token) {
  const eventGroupClient = getEventGroupClient(token)

  const getAllEventGroups = async () => (
    eventGroupClient.get('/')
  )

  const getEventGroupById = async (id) => (
    eventGroupClient.get(`/${id}`)
  )

  const createEventGroup = async (payload) => (
    eventGroupClient.post('/', payload)
  )

  const updateEventGroup = async (id, payload) => (
    eventGroupClient.put(`/${id}`, payload)
  )

  const deleteEventGroup = async (id) => (
    eventGroupClient.delete(`/${id}`)
  )

  const addCharacterToEventGroup = async (id, characterId) => (
    eventGroupClient.post(`/${id}/characters/add`, {
      character: characterId
    })
  )

  const removeCharacterFromEventGroup = async (id, characterId) => (
    eventGroupClient.post(`/${id}/characters/remove`, {
      character: characterId
    })
  )

  return {
    getAllEventGroups,
    getEventGroupById,
    createEventGroup,
    updateEventGroup,
    deleteEventGroup,
    addCharacterToEventGroup,
    removeCharacterFromEventGroup
  }
}
