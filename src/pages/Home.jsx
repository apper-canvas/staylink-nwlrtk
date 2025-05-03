import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import getIcon from '../utils/iconUtils'

const HotelIcon = getIcon('Hotel')
const UserIcon = getIcon('User')
const ChevronRightIcon = getIcon('ChevronRight')

export default function Home() {
  const [userRole, setUserRole] = useState(null)
  
  const handleRoleSelect = (role) => {
    setUserRole(role)
    toast.success(`You selected the ${role} view`)
  }
  
  const roleCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }
  
  return (
    <div className="pb-12">
      <section className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="mb-4 text-gradient font-bold leading-tight">
            Welcome to StayLink
          </h1>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300">
            Connect with travelers or find your perfect stay with our seamless hotel reservation platform
          </p>
        </motion.div>
        
        {!userRole ? (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Choose Your Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'hotel_owner', title: 'Hotel Owner', icon: HotelIcon, description: "List properties, manage bookings, and grow your business" },
                { id: 'traveler', title: 'Traveler', icon: UserIcon, description: "Discover and book accommodations for your next trip" }
              ].map((role, i) => (
                <motion.div
                  key={role.id}
                  custom={i}
                  variants={roleCardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="glass-card cursor-pointer hover:border-primary/30 dark:hover:border-primary/30 transition-all"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
                      <role.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        {role.title}
                        <ChevronRightIcon className="w-4 h-4 text-primary" />
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <MainFeature userRole={userRole} onRoleChange={setUserRole} />
        )}
      </section>
      
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "For Hotel Owners",
              description: "Manage your properties, track bookings, and optimize your business all in one place.",
              image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "For Travelers",
              description: "Discover unique stays, compare options, and book your perfect accommodation with ease.",
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
              title: "Direct Connection",
              description: "Communication without middlemen means better rates for guests and higher margins for owners.",
              image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card overflow-hidden"
            >
              <div className="h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-surface-600 dark:text-surface-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}