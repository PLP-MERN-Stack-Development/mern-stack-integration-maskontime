import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  const isAuthenticated = !!localStorage.getItem('token')

  const login = async (email, password) => {
    const data = await authService.login({ email, password })
    if (data?.user) setUser(data.user)
    return data
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = useMemo(() => ({ user, isAuthenticated, login, logout }), [user, isAuthenticated])

  useEffect(() => {
    // keep user in sync with storage changes
    const onStorage = (e) => {
      if (e.key === 'user') {
        setUser(e.newValue ? JSON.parse(e.newValue) : null)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
