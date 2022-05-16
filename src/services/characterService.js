import axios from 'axios'
import { CHARACTER_SERVICE } from '../config/env'

const getCharacterClient = token => axios.create({
  baseURL: CHARACTER_SERVICE,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default function getCharacterService (token) {
  const characterClient = getCharacterClient(token)

  const getMyCharacters = async () => (
    characterClient.get('/')
  )

  const getCharacterById = async (id) => (
    characterClient.get(`/${id}`)
  )

  const createCharacter = async (payload) => (
    characterClient.post('/', payload)
  )

  const updateCharacter = async (id, payload) => (
    characterClient.put(`/${id}`, payload)
  )

  const deleteCharacter = async (id) => (
    characterClient.delete(`/${id}`)
  )

  return {
    getMyCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
  }
}
