import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/context/AuthContext"

export default function useAuthRoute (isPublic) {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPublic && !token) {
      navigate('/login')
    } else if (isPublic && token) {
      navigate('/')
    }
  }, [token, isPublic, navigate])
}