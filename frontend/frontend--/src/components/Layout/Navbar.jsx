import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link to="/" className="text-white font-semibold">MERN Blog</Link>
            <div className="ml-6 flex space-x-2">
              <NavLink to="/" className={navLink} end>Home</NavLink>
              <NavLink to="/posts" className={navLink}>Posts</NavLink>
              <NavLink to="/categories" className={navLink}>Categories</NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className={navLink}>Login</NavLink>
                <NavLink to="/register" className={navLink}>Register</NavLink>
              </>
            ) : (
              <>
                <span className="text-gray-200 text-sm hidden sm:inline">{user?.name || user?.email}</span>
                <NavLink to="/new" className={navLink}>New Post</NavLink>
                <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
