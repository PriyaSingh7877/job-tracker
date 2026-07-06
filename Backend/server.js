const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes') // auth routes import
const jobRoutes = require('./routes/jobRoutes')   // job routes import

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))

// MongoDB connect karo
connectDB()

// routes use karo
app.use('/api/auth', authRoutes) // /api/auth/register, /api/auth/login
app.use('/api/jobs', jobRoutes)  // /api/jobs

// test route
app.get('/', (req, res) => {
  res.send('Job Tracker API is running!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})