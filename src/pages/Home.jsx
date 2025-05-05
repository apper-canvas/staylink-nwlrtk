import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import getIcon from '../utils/iconUtils';

// Icons
const HotelIcon = getIcon('Hotel');
const UsersIcon = getIcon('Users');
const SearchIcon = getIcon('Search');
const CheckCircleIcon = getIcon('CheckCircle');
const CalendarIcon = getIcon('Calendar');
const CreditCardIcon = getIcon('CreditCard');

export default function Home() {
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    document.title = "StayLink - Find Your Perfect Stay";
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Perfect <span className="text-primary">Stay</span>
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
          Connect with thousands of hotels and travelers worldwide. Whether you're looking for the perfect vacation spot or managing your properties.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2">
              {userRole === 'hotel_owner' ? (
                <>
                  <HotelIcon className="w-5 h-5" />
                  Manage Properties
                </>
              ) : (
                <>
                  <SearchIcon className="w-5 h-5" />
                  Find Hotels
                </>
              )}
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary flex items-center justify-center gap-2">
                <HotelIcon className="w-5 h-5" />
                Join as Hotel Owner
              </Link>
              <Link to="/register" className="btn-outline flex items-center justify-center gap-2">
                <UsersIcon className="w-5 h-5" />
                Join as Traveller
              </Link>
            </>
          )}
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-surface-600 dark:text-surface-300">Simple steps to get started</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center text-primary">
                <SearchIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Hotels</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Search for hotels based on location, price range, and amenities to find your perfect match.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center text-primary">
                <CalendarIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Select your dates, confirm your booking, and receive instant confirmation without any hassle.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center text-primary">
                <CheckCircleIcon className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy Your Stay</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Pack your bags and enjoy your vacation or business trip with peace of mind.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* For Hotel Owners */}
      <section className="neu-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">For Hotel Owners</h2>
            <p className="text-surface-600 dark:text-surface-300">
              List your properties and connect with travelers from around the world. Manage bookings, update availability, and grow your business.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Easy property listing and management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Real-time booking notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Detailed analytics and reports</span>
              </li>
            </ul>
            
            {isAuthenticated && userRole === 'hotel_owner' ? (
              <Link to="/dashboard" className="btn-primary inline-block">
                Manage Your Properties
              </Link>
            ) : (
              <Link to="/register" className="btn-primary inline-block">
                Join as Hotel Owner
              </Link>
            )}
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Luxury hotel" 
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* For Travelers */}
      <section className="neu-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Travelers enjoying vacation" 
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
          
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">For Travelers</h2>
            <p className="text-surface-600 dark:text-surface-300">
              Discover unique accommodations for your next trip. From luxury hotels to cozy retreats, find the perfect place to stay.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Extensive selection of accommodations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Best price guarantee</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5" />
                <span>Secure booking process</span>
              </li>
            </ul>
            
            {isAuthenticated && userRole === 'traveller' ? (
              <Link to="/dashboard" className="btn-primary inline-block">
                Find Your Stay
              </Link>
            ) : (
              <Link to="/register" className="btn-primary inline-block">
                Join as Traveller
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center glass-card">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto mb-8">
          Join thousands of satisfied users on StayLink today and discover the easiest way to book and manage accommodations.
        </p>
        
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn-primary px-8 py-3 text-lg">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/register" className="btn-primary px-8 py-3 text-lg">
            Create an Account
          </Link>
        )}
      </section>
    </div>
  );
}