import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import getIcon from '../utils/iconUtils';

// Icons
const SunIcon = getIcon('Sun');
const MoonIcon = getIcon('Moon');
const UserIcon = getIcon('User');
const HotelIcon = getIcon('Hotel');
const LogOutIcon = getIcon('LogOut');
const MenuIcon = getIcon('Menu');
const XIcon = getIcon('X');

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-800/90 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18v-2H3v2zm3-10h4V4H6v7zm6 0h4V4h-4v7zm6 0h4V4h-4v7z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-surface-800 dark:text-white">Stay<span className="text-primary">Link</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                Dashboard
              </Link>
              
              {userRole === 'traveller' && (
                <Link to="/bookings" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                  My Bookings
                </Link>
              )}
              
              {userRole === 'hotel_owner' && (
                <Link to="/properties" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                  My Properties
                </Link>
              )}
              
              <div className="flex items-center border-l border-surface-200 dark:border-surface-700 pl-6 ml-2 gap-3">
                <div className="flex items-center gap-2">
                  {userRole === 'hotel_owner' ? (
                    <HotelIcon className="w-5 h-5 text-primary" />
                  ) : (
                    <UserIcon className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="btn-outline text-sm py-1 flex items-center gap-1"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1.5">
                Sign Up
              </Link>
            </>
          )}
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-surface-700 dark:text-surface-300"
          >
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link to="/" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                    Dashboard
                  </Link>
                  
                  {userRole === 'traveller' && (
                    <Link to="/bookings" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                      My Bookings
                    </Link>
                  )}
                  
                  {userRole === 'hotel_owner' && (
                    <Link to="/properties" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                      My Properties
                    </Link>
                  )}
                  
                  <div className="pt-3 mt-3 border-t border-surface-200 dark:border-surface-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {userRole === 'hotel_owner' ? (
                        <HotelIcon className="w-5 h-5 text-primary" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-primary" />
                      )}
                      <span className="font-medium">{currentUser.name}</span>
                    </div>
                    
                    <button 
                      onClick={handleLogout}
                      className="btn-outline text-sm py-1 flex items-center gap-1"
                    >
                      <LogOutIcon className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                    Login
                  </Link>
                  <Link to="/register" className="py-2 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}