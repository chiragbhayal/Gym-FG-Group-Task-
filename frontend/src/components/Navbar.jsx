import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Dumbbell, Menu, X, LogOut, User, Lock } from 'lucide-react';
import logoImg from '../assets/fg_group.webp';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3.5" onClick={() => setIsOpen(false)}>
              <img src={logoImg} alt="FG Group Logo" className="h-10 w-auto rounded-lg object-contain border border-gray-800 bg-[#070b12]" />
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent uppercase">
                Fitness With Gomzi
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-orange-500 transition-colors font-medium">Home</Link>
            <Link to="/blogs" className="hover:text-orange-500 transition-colors font-medium">Blogs</Link>
            <Link to="/shop" className="hover:text-orange-500 transition-colors font-medium">Shop</Link>
            
            <Link to="/inquiry" className="hover:text-orange-500 transition-colors font-medium flex items-center space-x-1">
              <span>Inquiry</span>
              {!user && <Lock className="h-3 w-3 text-orange-400" />}
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="text-orange-500 hover:text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-md border border-orange-500/20 transition-all">
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <User className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600/20 border border-red-500/30 hover:bg-red-600 hover:text-white text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-gray-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-orange-500 transition-all"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-orange-500 transition-all"
            >
              Blogs
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-orange-500 transition-all"
            >
              Shop
            </Link>
            <Link
              to="/inquiry"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-orange-500 transition-all flex items-center space-x-2"
            >
              <span>Inquiry</span>
              {!user && <Lock className="h-3 w-3 text-orange-400 inline" />}
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-orange-500 hover:bg-gray-800 transition-all"
              >
                Dashboard
              </Link>
            )}

            <div className="pt-4 pb-2 border-t border-gray-800">
              {user ? (
                <div className="px-3 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="h-5 w-5 text-orange-500" />
                    <span className="text-base font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600/20 border border-red-500/30 hover:bg-red-600 hover:text-white text-red-400 py-2 rounded-lg text-base font-medium transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="px-3 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-gray-300 hover:text-white py-2 rounded-md text-base font-medium border border-gray-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
