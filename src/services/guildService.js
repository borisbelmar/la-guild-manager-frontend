import axios from 'axios'
import { GUILD_SERVICE } from '../config/env'

const getGuildClient = token => axios.create({
  baseURL: GUILD_SERVICE,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default function getGuildService (token) {
  const characterClient = getGuildClient(token)

  const getAllGuilds = async () => (
    characterClient.get('/')
  )

  const getGuildById = async (id) => (
    characterClient.get(`/${id}`)
  )

  const createGuild = async (payload) => (
    characterClient.post('/', payload)
  )

  const updateGuild = async (id, payload) => (
    characterClient.put(`/${id}`, payload)
  )

  const deleteGuild = async (id) => (
    characterClient.delete(`/${id}`)
  )

  const getAllGuildMembers = async (id) => (
    characterClient.get(`/${id}/members`)
  )

  return {
    getAllGuilds,
    getGuildById,
    createGuild,
    updateGuild,
    deleteGuild,
    getAllGuildMembers
  }
}
