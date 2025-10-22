import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      const to = location.state?.from?.pathname || '/'
      navigate(to, { replace: true })
    } catch (e) {
      setError(e?.response?.data?.error || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border rounded p-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-black disabled:opacity-60">Login</button>
      <p className="text-sm text-center text-gray-600">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </form>
  )
}
