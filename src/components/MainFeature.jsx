import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import getIcon from '../utils/iconUtils'

// Icons
const HotelIcon = getIcon('Hotel')
const UserIcon = getIcon('User')
const SearchIcon = getIcon('Search')
const BedDoubleIcon = getIcon('BedDouble')
const CheckCircleIcon = getIcon('CheckCircle')
const CalendarIcon = getIcon('Calendar')
const DollarSignIcon = getIcon('DollarSign')
const UsersIcon = getIcon('Users')
const MapPinIcon = getIcon('MapPin')
const StarIcon = getIcon('Star')
const ArrowLeftIcon = getIcon('ArrowLeft')
const PlusCircleIcon = getIcon('PlusCircle')
const ImageIcon = getIcon('Image')
const EditIcon = getIcon('Edit')
const PlusIcon = getIcon('Plus')

// Sample Hotel Data
const HOTELS = [
  {
    id: 1,
    name: "Grand Horizon Hotel",
    location: "Miami, FL",
    price: 199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Luxury beachfront hotel with stunning ocean views and world-class amenities.",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Beach Access"]
  },
  {
    id: 2,
    name: "Urban Loft Suites",
    location: "New York, NY",
    price: 249,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Modern suites in the heart of Manhattan with stylish decor and city views.",
    amenities: ["Room Service", "Bar", "Workspace", "Air Conditioning", "City Views"]
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Denver, CO",
    price: 179,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Cozy mountain retreat with rustic charm and breathtaking natural surroundings.",
    amenities: ["Fireplace", "Hot Tub", "Hiking Trails", "Restaurant", "Pet Friendly"]
  },
  {
    id: 4,
    name: "Seaside Resort & Spa",
    location: "San Diego, CA",
    price: 289,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Premium oceanfront resort with luxurious spa treatments and fine dining.",
    amenities: ["Beach Access", "Spa", "Multiple Pools", "Fine Dining", "Water Sports"]
  }
];

// Main Feature Component
export default function MainFeature({ userRole, onRoleChange }) {
  const [formData, setFormData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    priceRange: 300,
  })
  
  const [filteredHotels, setFilteredHotels] = useState(HOTELS)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [booking, setBooking] = useState(null)
  
  // For hotel owner
  const [ownedHotels, setOwnedHotels] = useState(HOTELS.slice(0, 2))
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    image: '',
    amenities: ['WiFi']
  })
  
  // Handle search form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Filter hotels based on search criteria
  const handleSearch = (e) => {
    e.preventDefault()
    
    // Simple filtering logic
    const filtered = HOTELS.filter(hotel => {
      const locationMatch = formData.location === '' || 
        hotel.location.toLowerCase().includes(formData.location.toLowerCase())
      const priceMatch = hotel.price <= formData.priceRange
      
      return locationMatch && priceMatch
    })
    
    setFilteredHotels(filtered)
    
    if (filtered.length === 0) {
      toast.info("No hotels match your search criteria. Try adjusting your filters.")
    } else {
      toast.success(`Found ${filtered.length} hotels matching your criteria!`)
    }
  }
  
  // Select a hotel to view details
  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Book the selected hotel
  const handleBookNow = () => {
    if (!formData.checkIn || !formData.checkOut) {
      toast.error("Please select check-in and check-out dates")
      return
    }
    
    setBooking({
      hotel: selectedHotel,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      totalPrice: selectedHotel.price * calculateNights(formData.checkIn, formData.checkOut)
    })
    
    toast.success("Booking confirmed! Check your reservation details.")
  }
  
  // Calculate number of nights between dates
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays || 1
  }
  
  // Handle adding new property for hotel owners
  const handleAddProperty = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!newProperty.name || !newProperty.location || !newProperty.price) {
      toast.error("Please fill in all required fields")
      return
    }
    
    // Create new property
    const newHotel = {
      id: ownedHotels.length + 1,
      name: newProperty.name,
      location: newProperty.location,
      price: parseFloat(newProperty.price),
      rating: 0,
      image: newProperty.image || "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: newProperty.description,
      amenities: newProperty.amenities
    }
    
    setOwnedHotels(prev => [...prev, newHotel])
    setShowAddProperty(false)
    setNewProperty({
      name: '',
      location: '',
      price: '',
      description: '',
      image: '',
      amenities: ['WiFi']
    })
    
    toast.success("New property added successfully!")
  }
  
  // Handle adding amenities to new property
  const handleAddAmenity = () => {
    const amenity = prompt("Enter an amenity:")
    if (amenity && amenity.trim() !== '') {
      setNewProperty(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()]
      }))
    }
  }
  
  // Change role handler
  const handleChangeRole = () => {
    onRoleChange(null)
    setSelectedHotel(null)
    setBooking(null)
  }
  
  // Traveler Interface
  const TravelerInterface = () => (
    <div>
      {!booking ? (
        <>
          {!selectedHotel ? (
            <div className="space-y-8">
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSearch}
                className="neu-card max-w-3xl mx-auto"
              >
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <SearchIcon className="w-5 h-5 text-primary" />
                  Find Your Perfect Stay
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Location
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className="input pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Price Range (Max $)
                    </label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                      <input
                        type="range"
                        name="priceRange"
                        min="50"
                        max="500"
                        value={formData.priceRange}
                        onChange={handleInputChange}
                        className="input pl-10 h-10"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-600 dark:text-surface-400">
                        ${formData.priceRange}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="input pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="input pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Guests
                    </label>
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="input pl-10"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full md:w-auto"
                >
                  Search Hotels
                </button>
              </motion.form>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Available Properties</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredHotels.map((hotel, index) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="card overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => handleSelectHotel(hotel)}
                      >
                        <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{hotel.name}</h3>
                            <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                              <StarIcon className="w-4 h-4 mr-1" />
                              {hotel.rating}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-surface-600 dark:text-surface-400 mb-3">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hotel.location}</span>
                          </div>
                          
                          <p className="text-surface-600 dark:text-surface-400 text-sm line-clamp-2 mb-4">
                            {hotel.description}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">${hotel.price}<span className="text-sm text-surface-500">/night</span></span>
                            <button className="btn-outline text-sm py-1">View Details</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <button 
                onClick={() => setSelectedHotel(null)}
                className="flex items-center text-primary hover:underline"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Back to results
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="glass-card overflow-hidden">
                    <div className="h-72 -mx-6 -mt-6 mb-4 overflow-hidden">
                      <img 
                        src={selectedHotel.image} 
                        alt={selectedHotel.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
                      <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full">
                        <StarIcon className="w-5 h-5 mr-1" />
                        {selectedHotel.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-surface-600 dark:text-surface-400 mb-4">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      <span>{selectedHotel.location}</span>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-400 mb-6">
                      {selectedHotel.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHotel.amenities.map((amenity, i) => (
                          <div 
                            key={i}
                            className="flex items-center bg-surface-100 dark:bg-surface-700 px-3 py-1 rounded-full text-sm"
                          >
                            <CheckCircleIcon className="w-4 h-4 mr-1 text-primary" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="sticky top-20 neu-card"
                  >
                    <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-surface-600 dark:text-surface-400">Price per night</span>
                        <span className="font-semibold">${selectedHotel.price}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Check-in Date</label>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                            <input
                              type="date"
                              name="checkIn"
                              value={formData.checkIn}
                              onChange={handleInputChange}
                              className="input pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Check-out Date</label>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                            <input
                              type="date"
                              name="checkOut"
                              value={formData.checkOut}
                              onChange={handleInputChange}
                              className="input pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">Guests</label>
                          <div className="relative">
                            <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500 w-5 h-5" />
                            <select
                              name="guests"
                              value={formData.guests}
                              onChange={handleInputChange}
                              className="input pl-10"
                            >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {formData.checkIn && formData.checkOut && (
                        <div className="border-t border-surface-200 dark:border-surface-700 pt-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">
                              {calculateNights(formData.checkIn, formData.checkOut)} nights
                            </span>
                            <span className="font-semibold">
                              ${selectedHotel.price * calculateNights(formData.checkIn, formData.checkOut)}
                            </span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${selectedHotel.price * calculateNights(formData.checkIn, formData.checkOut)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={handleBookNow}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <BedDoubleIcon className="w-5 h-5" />
                      Book Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card overflow-hidden border-primary/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
                <CheckCircleIcon className="w-6 h-6" />
                Booking Confirmed!
              </h2>
              <button 
                onClick={() => {
                  setBooking(null)
                  setSelectedHotel(null)
                }}
                className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3 h-32 rounded-lg overflow-hidden">
                <img 
                  src={booking.hotel.image} 
                  alt={booking.hotel.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-lg font-semibold">{booking.hotel.name}</h3>
                <div className="flex items-center text-surface-600 dark:text-surface-400 mb-2">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{booking.hotel.location}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-surface-500 dark:text-surface-400">Check-in</p>
                    <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-surface-500 dark:text-surface-400">Check-out</p>
                    <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-surface-500 dark:text-surface-400">Guests</p>
                    <p className="font-medium">{booking.guests}</p>
                  </div>
                  <div>
                    <p className="text-surface-500 dark:text-surface-400">Total Nights</p>
                    <p className="font-medium">{calculateNights(booking.checkIn, booking.checkOut)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-surface-50 dark:bg-surface-800 p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-surface-600 dark:text-surface-400">
                  ${booking.hotel.price} x {calculateNights(booking.checkIn, booking.checkOut)} nights
                </span>
                <span>${booking.totalPrice}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>${booking.totalPrice}</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-surface-600 dark:text-surface-400">
                A confirmation email has been sent to your registered email address.
              </p>
              <p className="text-surface-600 dark:text-surface-400">
                Booking ID: <span className="font-mono font-medium">BK-{Math.floor(Math.random() * 1000000)}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
  
  // Hotel Owner Interface
  const HotelOwnerInterface = () => (
    <div>
      {showAddProperty ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Property</h2>
              <button 
                onClick={() => setShowAddProperty(false)}
                className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddProperty} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Property Name *</label>
                  <input
                    type="text"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, name: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Location *</label>
                  <input
                    type="text"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, location: e.target.value }))}
                    className="input"
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Price per Night (USD) *</label>
                  <input
                    type="number"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, price: e.target.value }))}
                    className="input"
                    min="1"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Image URL</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newProperty.image}
                      onChange={(e) => setNewProperty(prev => ({ ...prev, image: e.target.value }))}
                      className="input rounded-r-none flex-1"
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="bg-surface-200 dark:bg-surface-700 flex items-center justify-center px-3 rounded-r-lg">
                      <ImageIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={newProperty.description}
                    onChange={(e) => setNewProperty(prev => ({ ...prev, description: e.target.value }))}
                    className="input min-h-[100px]"
                    placeholder="Describe your property..."
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">Amenities</label>
                    <button 
                      type="button"
                      onClick={handleAddAmenity}
                      className="text-primary hover:text-primary-dark flex items-center text-sm"
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Amenity
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                    {newProperty.amenities.map((amenity, i) => (
                      <div 
                        key={i}
                        className="bg-white dark:bg-surface-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-1 text-primary" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAddProperty(false)}
                  className="btn bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-700 dark:text-surface-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Properties</h2>
              <button 
                onClick={() => setShowAddProperty(true)}
                className="btn-primary flex items-center gap-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                Add Property
              </button>
            </div>
            
            <div className="space-y-5">
              {ownedHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row gap-4 bg-white dark:bg-surface-800 p-4 rounded-xl shadow-sm border border-surface-200 dark:border-surface-700"
                >
                  <div className="md:w-1/4 h-24 md:h-auto rounded-lg overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="md:w-3/4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <div className="flex items-center gap-1 bg-primary-light/10 text-primary px-2 py-1 rounded-full text-sm">
                          <StarIcon className="w-4 h-4" />
                          {hotel.rating || 'N/A'}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-surface-600 dark:text-surface-400 mb-2">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                      
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 line-clamp-1">
                        {hotel.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">${hotel.price}<span className="text-sm text-surface-500">/night</span></span>
                      <button className="btn-outline text-sm py-1 flex items-center gap-1">
                        <EditIcon className="w-4 h-4" />
                        Edit Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Upcoming Bookings</h2>
              
              <div className="space-y-4">
                <div className="bg-surface-50 dark:bg-surface-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">John Smith</h3>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">Confirmed</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Property</p>
                      <p className="font-medium">Urban Loft Suites</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Check-in</p>
                      <p className="font-medium">Jun 12, 2023</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Check-out</p>
                      <p className="font-medium">Jun 15, 2023</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Total</p>
                      <p className="font-medium">$747</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Emily Johnson</h3>
                    <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Property</p>
                      <p className="font-medium">Grand Horizon Hotel</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Check-in</p>
                      <p className="font-medium">Jun 18, 2023</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Check-out</p>
                      <p className="font-medium">Jun 22, 2023</p>
                    </div>
                    <div>
                      <p className="text-surface-500 dark:text-surface-400">Total</p>
                      <p className="font-medium">$796</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {userRole === 'hotel_owner' ? (
            <span className="flex items-center gap-2">
              <HotelIcon className="w-6 h-6 text-primary" />
              Hotel Owner Dashboard
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-primary" />
              Traveler Experience
            </span>
          )}
        </h2>
        <button 
          onClick={handleChangeRole} 
          className="text-primary hover:text-primary-dark text-sm underline"
        >
          Change Role
        </button>
      </div>
      
      {userRole === 'hotel_owner' ? <HotelOwnerInterface /> : <TravelerInterface />}
    </div>
  )
}