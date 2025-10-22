import { useEffect, useState } from 'react'
import { categoryService } from '../../services/api'

export default function CategoryListPage() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    categoryService
      .list()
      .then((res) => mounted && setCategories(res.categories || res))
      .catch((e) => mounted && setError(e?.response?.data?.error || 'Failed to load categories'))
    return () => (mounted = false)
  }, [])

  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <ul className="list-disc pl-5">
        {categories.map((c) => (
          <li key={c._id} className="text-gray-800">{c.name}</li>
        ))}
      </ul>
    </div>
  )
}
