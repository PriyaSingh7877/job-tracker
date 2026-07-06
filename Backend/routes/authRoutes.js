const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')

// POST /api/auth/register - naya user banao
router.post('/register', register)

// POST /api/auth/login - login karo
router.post('/login', login)

module.exports = router