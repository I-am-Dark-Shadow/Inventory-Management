import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('Kredent'); // Default
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, branch);
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
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
           {/* BRANCH DROPDOWN */}
           <div>
            <label className="block text-gray-400 text-xs mb-1">Select Branch</label>
            <select 
                className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-blue-500"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
            >
                <option value="Kredent">Kredent</option>
                <option value="Dalhousie">Dalhousie</option>
            </select>
          </div>
          
          {/* ... Name, Email, Password Inputs same as before ... */}
          <input type="text" placeholder="Full Name" required className="w-full bg-black border border-gray-700 text-white p-3 rounded" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" required className="w-full bg-black border border-gray-700 text-white p-3 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full bg-black border border-gray-700 text-white p-3 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />

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