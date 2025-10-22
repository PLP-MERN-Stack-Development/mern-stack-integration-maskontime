import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postService } from '../../services/api'

export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    postService
      .get(id)
      .then((res) => mounted && setPost(res))
      .catch((e) => mounted && setError(e?.response?.data?.error || 'Failed to load post'))
    return () => (mounted = false)
  }, [id])

  if (error) return <div className="text-red-600">{error}</div>
  if (!post) return <div className="text-gray-600">Loading...</div>

  return (
    <article className="prose max-w-none">
      <h1>{post.title}</h1>
      {post.image && (
        <img src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/${post.image}`} alt="cover" className="rounded" />
      )}
      <p className="whitespace-pre-wrap">{post.content}</p>
    </article>
  )
}
