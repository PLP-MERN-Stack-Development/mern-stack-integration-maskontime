import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import PostListPage from './pages/Posts/PostListPage.jsx'
import PostDetailPage from './pages/Posts/PostDetailPage.jsx'
import NewPostPage from './pages/Posts/NewPostPage.jsx'
import EditPostPage from './pages/Posts/EditPostPage.jsx'
import CategoryListPage from './pages/Categories/CategoryListPage.jsx'
import LoginPage from './pages/Auth/LoginPage.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './components/Layout/ProtectedRoute.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
