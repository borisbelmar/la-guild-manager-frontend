import jwtDecode from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"

const TOKEN_KEY = 'la-guild-manager:token'

const AuthContext = createContext({
  user: null,
  token: null,
  setSession: _token => {},
  clearSession: () => {},
})


export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch {
        clearSession()
      }
    } else {
      setUser(null)
    }
  }, [token])

  const setSession = token => {
    setToken(token)
    localStorage.setItem(TOKEN_KEY, token)
  }

  const clearSession = () => {
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      setSession,
      clearSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
