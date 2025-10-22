import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to MERN Blog</h1>
      <p className="text-gray-600">Browse posts, read details, and create your own once logged in.</p>
      <div className="flex gap-3">
        <Link to="/posts" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">View Posts</Link>
        <Link to="/categories" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">View Categories</Link>
      </div>
    </div>
  )
}
