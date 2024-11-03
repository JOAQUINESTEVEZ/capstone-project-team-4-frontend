import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state

  // Check for token in sessionStorage on initial load
  useEffect(() => {
    const token = sessionStorage.getItem('sessionToken');  // Check localStorage for token

    if (token) {
      setIsAuthenticated(true);  // If token exists, mark as authenticated
    }
    setLoading(false);  // Once checked, turn off loading
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth state
export const useAuth = () => {
  return useContext(AuthContext);
};