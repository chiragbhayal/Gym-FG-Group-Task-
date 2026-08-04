import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#070b12] relative">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="max-w-md w-full space-y-8 glass p-8 rounded-2xl border border-gray-800 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Dumbbell className="h-10 w-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">Register</h2>
          <p className="text-xs text-gray-500">Create your free FlexFit account today</p>
        </div>

        {error && (
          <div className="bg-red-600/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0b0f19] border border-gray-800 focus:border-orange-500 text-white rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-custom hover-gradient text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
          >
            <span>{loading ? 'Registering...' : 'Sign Up'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
