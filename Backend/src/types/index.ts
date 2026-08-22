// Job application ka type - ek job mein ye sab fields honge
export interface Job {
  _id: string;           // MongoDB se aayega unique ID
  company: string;       // Company ka naam - e.g. "Google"
  role: string;          // Job role - e.g. "Frontend Developer"
  status: "Applied" | "Interview" | "Offered" | "Rejected"; // sirf ye 4 values allowed
  appliedDate: string;   // Kab apply kiya - e.g. "2024-01-15"
  notes?: string;        // Optional - koi extra note
}

// Login form ka type
export interface LoginForm {
  email: string;
  password: string;
}

// Register form ka type
export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}