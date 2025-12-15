import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Mood from './pages/Mood'
import Review from './pages/Review'
import AllLiked from './pages/AllLiked'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/review" element={<Review />} />
      <Route path="/liked" element={<AllLiked />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}
