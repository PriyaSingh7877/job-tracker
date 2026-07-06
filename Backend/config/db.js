const mongoose = require('mongoose')

// MongoDB se connect karne ka function
const connectDB = async () => {
  try {
    // .env se MONGO_URI lo aur connect karo
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected!')
  } catch (error) {
    console.log('MongoDB connection failed!', error)
    process.exit(1) // error aaye toh server band kar do
  }
}

module.exports = connectDB