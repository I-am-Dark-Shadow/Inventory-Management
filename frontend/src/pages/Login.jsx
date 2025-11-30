import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#18181B] p-8 rounded-xl border border-gray-800 w-96 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" placeholder="Email" required
            className="w-full bg-black border border-gray-700 text-white p-3 rounded"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required
            className="w-full bg-black border border-gray-700 text-white p-3 rounded"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;