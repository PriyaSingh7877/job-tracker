import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // animation import
import { getJobs, createJob, deleteJob } from '../services/api'
import type { Job } from '../types/index'

function Dashboard() {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    notes: ''
  })

  const token = localStorage.getItem('token') || ''

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await getJobs(token)
      setJobs(response.data)
    } catch (error) {
      console.log('Error fetching jobs:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddJob = async () => {
    try {
      await createJob(formData, token)
      setShowForm(false)
      setFormData({ company: '', role: '', status: 'Applied', appliedDate: '', notes: '' })
      fetchJobs()
    } catch (error) {
      console.log('Error adding job:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id, token)
      fetchJobs()
    } catch (error) {
      console.log('Error deleting job:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const statusColor = (status: string) => {
    if (status === 'Applied') return 'bg-blue-100 text-blue-700'
    if (status === 'Interview') return 'bg-yellow-100 text-yellow-700'
    if (status === 'Offered') return 'bg-green-100 text-green-700'
    if (status === 'Rejected') return 'bg-red-100 text-red-700'
    return ''
  }

  // stats count karo
  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'Applied').length,
    interview: jobs.filter(j => j.status === 'Interview').length,
    offered: jobs.filter(j => j.status === 'Offered').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length,
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50">

      {/* Navbar - slide down animation */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow px-6 py-4 flex justify-between items-center"
      >
        <h1 className="text-xl font-bold text-blue-600">💼 Job Tracker</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </motion.nav>

      <div className="max-w-4xl mx-auto mt-8 px-4">

        {/* Stats Cards - fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total', value: stats.total, color: 'bg-blue-500' },
            { label: 'Interview', value: stats.interview, color: 'bg-yellow-500' },
            { label: 'Offered', value: stats.offered, color: 'bg-green-500' },
            { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} text-white rounded-xl p-4 text-center shadow`}
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Heading + Add Job button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {showForm ? 'Cancel' : '+ Add Job'}
          </motion.button>
        </div>

        {/* Add Job Form - slide down animation */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow p-6 mb-6 overflow-hidden"
            >
              <h3 className="text-lg font-bold mb-4">Add New Job</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange}
                  placeholder="e.g. Google"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offered</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Applied Date</label>
                <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange}
                  placeholder="Any extra info..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddJob}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Save Job
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow p-8 text-center text-gray-400"
          >
            No jobs added yet. Click "+ Add Job" to get started!
          </motion.div>
        ) : (
          <AnimatePresence>
            {jobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow p-5 mb-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{job.company}</h3>
                  <p className="text-gray-600">{job.role}</p>
                  <p className="text-sm text-gray-400">{job.appliedDate}</p>
                  {job.notes && <p className="text-sm text-gray-500 mt-1 italic">{job.notes}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

      </div>
    </div>
  )
}

export default Dashboard