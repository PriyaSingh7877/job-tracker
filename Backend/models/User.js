const mongoose = require('mongoose')

// User ka schema - database mein kaisa store hoga
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true  // name zaroori hai
  },
  email: {
    type: String,
    required: true,
    unique: true    // ek email sirf ek baar register ho sakti hai
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }) // createdAt, updatedAt automatically add hoga

module.exports = mongoose.model('User', userSchema)