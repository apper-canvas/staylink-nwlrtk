import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import getIcon from '../utils/iconUtils';

// Icons
const UserIcon = getIcon('User');
const KeyIcon = getIcon('Key');
const HotelIcon = getIcon('Hotel');
const UsersIcon = getIcon('Users');
const UserPlusIcon = getIcon('UserPlus');
const MailIcon = getIcon('Mail');

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!role) {
      alert('Please select a role');
      return;
    }
    
    if (register(email, password, name, role)) {
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto glass-card"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
        <p className="text-surface-600 dark:text-surface-400">
          Sign up to start your journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Full Name</label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input pl-10"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
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
              placeholder="Create a password"
              minLength="6"
              required
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium">I am a:</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => setRole('hotel_owner')}
              className={`btn ${
                role === 'hotel_owner' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
              } flex items-center justify-center gap-2`}
            >
              <HotelIcon className="w-4 h-4" />
              Hotel Owner
            </button>
            <button 
              type="button"
              onClick={() => setRole('traveller')}
              className={`btn ${
                role === 'traveller' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
              } flex items-center justify-center gap-2`}
            >
              <UsersIcon className="w-4 h-4" />
              Traveller
            </button>
          </div>
          {!role && (
            <p className="text-xs text-surface-500 dark:text-surface-400 italic">
              Please select your account type
            </p>
          )}
        </div>
        
        <button 
          type="submit" 
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={!role}
        >
          <UserPlusIcon className="w-5 h-5" />
          Create Account
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 text-center text-sm">
        <p className="text-surface-600 dark:text-surface-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}