import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/api'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.register({ name, email, password })
      navigate('/login')
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to register')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow space-y-3">
      <h1 className="text-xl font-semibold">Register</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border rounded p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button disabled={loading} className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-black disabled:opacity-60">Create account</button>
      <p className="text-sm text-center text-gray-600">Have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </form>
  )
}
