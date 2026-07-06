const Job = require('../models/Job') // Job model import kiya

// ========== GET ALL JOBS ==========
const getJobs = async (req, res) => {
  try {
    // sirf us user ki jobs lo jo login hai
    const jobs = await Job.find({ user: req.user.id })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

// ========== CREATE JOB ==========
const createJob = async (req, res) => {
  try {
    const { company, role, status, appliedDate, notes } = req.body

    // naya job banao - user ID middleware se aati hai
    const job = await Job.create({
      user: req.user.id,  // kon sa user hai ye
      company,
      role,
      status,
      appliedDate,
      notes
    })

    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

// ========== UPDATE JOB ==========
const updateJob = async (req, res) => {
  try {
    // pehle job dhundo
    const job = await Job.findById(req.params.id)

    // job exist karti hai ya nahi
    if (!job) {
      return res.status(404).json({ message: 'Job not found!' })
    }

    // check karo ye job us user ki hai jo login hai
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' })
    }

    // job update karo
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // updated job return karo
    )

    res.json(updatedJob)
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

// ========== DELETE JOB ==========
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found!' })
    }

    // check karo ye job us user ki hai
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized!' })
    }

    // job delete karo
    await Job.findByIdAndDelete(req.params.id)

    res.json({ message: 'Job deleted successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error!', error })
  }
}

module.exports = { getJobs, createJob, updateJob, deleteJob }