import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginUser } from '../services/api'
import type { LoginForm } from '../types/index'
import ParticlesBackground from '../components/ParticlesBackground'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const response = await loginUser(formData)
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    } catch (error) {
      alert('Invalid email or password!')
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
      
      {/* Asli ParticlesBackground component */}
      <ParticlesBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 1, position: 'relative' }}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-96"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center mb-6 text-indigo-600"
        >
          Welcome Back 👋
        </motion.h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-400 bg-white/70"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-400 bg-white/70"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03, backgroundColor: '#4338ca' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 rounded-xl font-medium transition-colors"
        >
          Login
        </motion.button>

        <p className="text-center text-sm mt-4 text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-500 hover:underline font-medium">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default Login