const express = require('express')
const router = express.Router()
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController')
const authMiddleware = require('../middleware/authMiddleware')

// authMiddleware har route pe lagao - sirf logged in user access kar sake
// GET /api/jobs - sabhi jobs lo
router.get('/', authMiddleware, getJobs)

// POST /api/jobs - naya job add karo
router.post('/', authMiddleware, createJob)

// PUT /api/jobs/:id - job update karo
router.put('/:id', authMiddleware, updateJob)

// DELETE /api/jobs/:id - job delete karo
router.delete('/:id', authMiddleware, deleteJob)

module.exports = router