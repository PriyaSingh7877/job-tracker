// axios import kiya
import axios from 'axios'

// base URL set kiya - yahan backend chal raha hai
// har API call mein ye URL automatically lagega aage
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// ========== AUTH APIs ==========

// Register API call
export const registerUser = (data: { name: string; email: string; password: string }) => {
  return API.post('/auth/register', data)
}

// Login API call
export const loginUser = (data: { email: string; password: string }) => {
  return API.post('/auth/login', data)
}

// ========== JOB APIs ==========

// Sabhi jobs fetch karo
export const getJobs = (token: string) => {
  return API.get('/jobs', {
    headers: { Authorization: `Bearer ${token}` } // JWT token bhejo header mein
  })
}

// Naya job add karo
export const createJob = (data: object, token: string) => {
  return API.post('/jobs', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

// Job delete karo
export const deleteJob = (id: string, token: string) => {
  return API.delete(`/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

// Job update karo
export const updateJob = (id: string, data: object, token: string) => {
  return API.put(`/jobs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
}