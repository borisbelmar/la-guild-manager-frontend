import axios from 'axios'
import { AUTH_SERVICE } from '../config/env'

const authClient = axios.create({
  baseURL: AUTH_SERVICE
})

const login = async payload => {
  return authClient.post('/login', payload)
}

const register = async payload => {
  return authClient.post('/register', payload)
}

export default function getAuthService() {
  return {
    login,
    register,
  }
}
