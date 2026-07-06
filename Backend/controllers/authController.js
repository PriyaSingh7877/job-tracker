const User = require('../models/User')     // User model import kiya
const bcrypt = require('bcryptjs')         // password hashing ke liye
const jwt = require('jsonwebtoken')        // token banane ke liye

// ========== REGISTER ==========
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body  // frontend se aaya data

    // check karo email already exist toh nahi karti
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' })
    }

    // password hash karo - plain text store nahi karte
    const hashedPassword = await bcrypt.hash(password, 10)

    // naya user banao
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // JWT token banao
    const token = jwt.sign(
      { id: user._id },           // token mein user ID store hogi
      process.env.JWT_SECRET,     // secret key .env se
      { expiresIn: '7d' }         // 7 din mein expire hoga
    )

    // frontend ko token aur user info bhejo
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

// ========== LOGIN ==========
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // email se user dhundo
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' })
    }

    // password match karo
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password!' })
    }

    // token banao
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })

  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

module.exports = { register, login }