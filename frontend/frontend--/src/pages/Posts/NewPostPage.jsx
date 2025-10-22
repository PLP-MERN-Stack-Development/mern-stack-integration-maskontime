import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postService } from '../../services/api'

export default function NewPostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await postService.create({ title, content, image })
      navigate(`/posts/${res?.post?._id || res?._id}`)
    } catch (e) {
      setError(e?.response?.data?.error || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h1 className="text-xl font-semibold">New Post</h1>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input className="w-full border rounded p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full border rounded p-2 h-40" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60">Create</button>
    </form>
  )
}
