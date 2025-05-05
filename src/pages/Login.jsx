import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import getIcon from '../utils/iconUtils';

// Icons
const UserIcon = getIcon('User');
const KeyIcon = getIcon('Key');
const HotelIcon = getIcon('Hotel');
const UsersIcon = getIcon('Users');
const LogInIcon = getIcon('LogIn');

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (login(email, password)) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = (role) => {
    const credentials = role === 'hotel_owner' 
      ? { email: 'owner@example.com', password: 'password123' } 
      : { email: 'traveller@example.com', password: 'password123' };
    
    setEmail(credentials.email);
    setPassword(credentials.password);
    
    if (login(credentials.email, credentials.password)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto glass-card"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Sign in to continue to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <LogInIcon className="w-5 h-5" />
          Sign In
        </button>
      </form>
      
      {!showDemo ? (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setShowDemo(true)}
            className="text-primary hover:underline text-sm"
          >
            Demo Login Options
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-sm text-center text-surface-600 dark:text-surface-400 mb-3">
            Demo Accounts:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleDemoLogin('hotel_owner')}
              className="btn bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 flex items-center justify-center gap-2"
            >
              <HotelIcon className="w-4 h-4" />
              Hotel Owner
            </button>
            <button 
              onClick={() => handleDemoLogin('traveller')}
              className="btn bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300 flex items-center justify-center gap-2"
            >
              <UsersIcon className="w-4 h-4" />
              Traveller
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 text-center text-sm">
        <p className="text-surface-600 dark:text-surface-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </motion.div>
  );
}