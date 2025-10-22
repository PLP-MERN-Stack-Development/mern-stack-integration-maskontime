import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (!location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export const postService = {
  list: (params = {}) => api.get('/posts', { params }).then((r) => r.data),
  get: (id) => api.get(`/posts/${id}`).then((r) => r.data),
  create: (data) => {
    const form = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v)
    })
    return api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)
  },
  update: (id, data) => {
    const form = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v)
    })
    return api.put(`/posts/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data)
  },
  remove: (id) => api.delete(`/posts/${id}`).then((r) => r.data),
  addComment: (id, data) => api.post(`/posts/${id}/comments`, data).then((r) => r.data),
  search: (q) => api.get('/posts/search', { params: { q } }).then((r) => r.data),
}

export const categoryService = {
  list: () => api.get('/categories').then((r) => r.data),
  get: (id) => api.get(`/categories/${id}`).then((r) => r.data),
  create: (data) => api.post('/categories', data).then((r) => r.data),
}

export const authService = {
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
  login: async (data) => {
    const res = await api.post('/auth/login', data)
    const { token, user } = res.data || {}
    if (token) localStorage.setItem('token', token)
    if (user) localStorage.setItem('user', JSON.stringify(user))
    return res.data
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  me: () => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  },
}

export default api
