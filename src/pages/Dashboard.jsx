import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MainFeature from '../components/MainFeature';

export default function Dashboard() {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  // Add a page title effect
  useEffect(() => {
    document.title = `${userRole === 'hotel_owner' ? 'Owner' : 'Traveller'} Dashboard | StayLink`;
  }, [userRole]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <MainFeature userRole={userRole} />
    </motion.div>
  );
}