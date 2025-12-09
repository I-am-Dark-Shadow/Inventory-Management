import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NetworkBackground from '../components/NetworkBackground';
import toast from 'react-hot-toast';
import { Mail, Lock, Building2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [branch, setBranch] = useState('Kredent');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, branch);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
   <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4 overflow-hidden">
    <NetworkBackground />
      {/* Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.15)] p-8">

        {/* Header */}
        <div className="text-center mb-8 flex flex-col justify-center items-center">
          <img src="./images.png" alt="" className='w-60' />
          {/* <p className="text-gray-400 text-sm mt-1">
            Sign in to continue to your dashboard
          </p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Branch */}
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Select Branch</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-black/60 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Kredent">SEC-V</option>
                <option value="Dalhousie">DALHOUSIE</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/60 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-900 to-yellow-700 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        {/* <p className="mt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p> */}

      </div>
    </div>
  );
};

export default Login;
