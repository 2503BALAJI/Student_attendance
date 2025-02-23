import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [college, setCollege] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, role, college });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Student Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Select Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Select College</label>
            <select 
              value={college} 
              onChange={(e) => setCollege(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select your college</option>
              <option value="collegeA">Sinhgad Institute of Management</option>
              <option value="collegeB">Sinhgad College of Engineering</option>
              <option value="collegeC">Sinhgad College of Architucture</option>
            </select>
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
}
