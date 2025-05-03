import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import getIcon from '../utils/iconUtils'

const AlertCircleIcon = getIcon('AlertCircle')
const HomeIcon = getIcon('Home')

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-primary mb-6"
      >
        <AlertCircleIcon className="w-20 h-20 mx-auto" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
      >
        404
      </motion.h1>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold mb-4"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-surface-600 dark:text-surface-400 mb-8 max-w-md"
      >
        We couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link to="/" className="btn-primary flex items-center gap-2 mx-auto">
          <HomeIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 w-full max-w-md mx-auto p-4 bg-surface-100 dark:bg-surface-800 rounded-xl"
      >
        <div className="text-sm text-surface-600 dark:text-surface-400">
          <p>Looking for something specific? Try checking our help center or contact support.</p>
        </div>
      </motion.div>
    </motion.div>
  )
}