const jwt = require('jsonwebtoken')

// ye function har protected route pe pehle chalega
// jaise security guard - token check karega
const authMiddleware = (req, res, next) => {
  try {
    // request ke header se token lo
    const token = req.headers.authorization?.split(' ')[1]
    // authorization header aisa hota hai: "Bearer tokenvalue"
    // split(' ')[1] se sirf token part lo

    // agar token nahi hai
    if (!token) {
      return res.status(401).json({ message: 'No token, access denied!' })
    }

    // token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // decoded user info ko request mein attach karo
    // taaki aage controller mein use kar sakein
    req.user = decoded

    next() // aage jaane do - controller chalega
    
  } catch (error) {
    res.status(401).json({ message: 'Invalid token!' })
  }
}

module.exports = authMiddleware