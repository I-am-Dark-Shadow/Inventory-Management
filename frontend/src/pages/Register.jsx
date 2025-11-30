import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Registration successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#18181B] p-8 rounded-xl border border-gray-800 w-96 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Create Account</h1>
        <p className="text-gray-500 text-center mb-6 text-sm">Join the inventory management system</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Full Name</label>
            <input 
              type="text" required
              className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-blue-500 focus:outline-none"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Email Address</label>
            <input 
              type="email" required
              className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-blue-500 focus:outline-none"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Password</label>
            <input 
              type="password" required
              className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-blue-500 focus:outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 mt-2">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;