import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create the auth context
const AuthContext = createContext();

// Sample users for demo purposes
const DEMO_USERS = [
  { id: 1, email: 'owner@example.com', password: 'password123', role: 'hotel_owner', name: 'John Doe' },
  { id: 2, email: 'traveller@example.com', password: 'password123', role: 'traveller', name: 'Jane Smith' }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('staylink_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('staylink_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('staylink_user');
    }
  }, [currentUser]);

  // Login function
  const login = (email, password) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    const user = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      setLoading(false);
      return true;
    } else {
      toast.error('Invalid email or password');
      setLoading(false);
      return false;
    }
  };

  // Register function
  const register = (email, password, name, role) => {
    setLoading(true);
    
    // Check if user already exists
    const userExists = DEMO_USERS.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      toast.error('User with this email already exists');
      setLoading(false);
      return false;
    }

    // In a real app, this would be an API call to create a user
    const newUser = {
      id: DEMO_USERS.length + 1,
      email,
      name,
      role
    };

    // For demo purposes, we'll just log the user in directly
    setCurrentUser(newUser);
    toast.success('Account created successfully!');
    setLoading(false);
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    toast.info('You have been logged out');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;