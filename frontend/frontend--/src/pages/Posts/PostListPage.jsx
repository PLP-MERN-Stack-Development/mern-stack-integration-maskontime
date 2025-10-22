import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postService } from '../../services/api'

export default function PostListPage() {
  const [data, setData] = useState({ posts: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    postService
      .list()
      .then((res) => mounted && setData(res))
      .catch((e) => mounted && setError(e?.response?.data?.error || 'Failed to load posts'))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [])

  if (loading) return <div className="text-gray-600">Loading...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <ul className="divide-y divide-gray-200 bg-white rounded shadow">
        {(data.posts || []).map((p) => (
          <li key={p._id} className="p-4 flex items-center justify-between">
            <div>
              <h2 className="font-medium text-gray-900">{p.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-1">{p.excerpt || p.content?.slice(0, 120)}</p>
            </div>
            <Link to={`/posts/${p._id}`} className="text-blue-600 hover:underline">Read</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
