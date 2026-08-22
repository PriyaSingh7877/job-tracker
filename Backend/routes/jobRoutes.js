const express = require('express')
const router = express.Router()
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController')
const authmiddleware = require('../middleware/authmiddleware')

// authMiddleware har route pe lagao - sirf logged in user access kar sake
// GET /api/jobs - sabhi jobs lo
router.get('/', authmiddleware, getJobs)

// POST /api/jobs - naya job add karo
router.post('/', authmiddleware, createJob)

// PUT /api/jobs/:id - job update karo
router.put('/:id', authmiddleware, updateJob)

// DELETE /api/jobs/:id - job delete karo
router.delete('/:id', authmiddleware, deleteJob)

module.exports = router