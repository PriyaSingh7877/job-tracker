const mongoose = require('mongoose')

// Job ka schema - ek job application mein kya kya hoga
const jobSchema = new mongoose.Schema({
  
  // ye job kis user ki hai - User model se link
  user: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ka unique ID
    ref: 'User',                          // User model se connected hai
    required: true
  },
  
  company: {
    type: String,
    required: true  // company naam zaroori hai
  },
  
  role: {
    type: String,
    required: true  // job role zaroori hai
  },
  
  status: {
    type: String,
    // sirf ye 4 values allowed hain
    enum: ['Applied', 'Interview', 'Offered', 'Rejected'],
    default: 'Applied'  // default Applied rahega
  },
  
  appliedDate: {
    type: String,
    required: true
  },
  
  notes: {
    type: String,
    default: ''  // optional field
  }

}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)