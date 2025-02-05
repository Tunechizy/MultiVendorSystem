// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  // State hook to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect hook to run on initial mount and set up the auth check
  useEffect(() => {
    // Function to check authentication status
    const checkAuth = () => {
      try {
        // Retrieve the auth token from localStorage
        const token = localStorage.getItem('authToken');

        // Check if the token exists (and optionally validate it)
        if (token) {
          // Token exists, mark the user as authenticated
          setIsAuthenticated(true);
        } else {
          // Token doesn't exist, user is not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        // In case of error (e.g., corrupted localStorage), log and mark as unauthenticated
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };

    // Call checkAuth to set the initial authentication status
    checkAuth();

    // Optional: Listen to changes in localStorage to reflect authentication status dynamically
    const handleStorageChange = () => checkAuth();

    // Add event listener for 'storage' event to detect changes in localStorage (cross-tab communication)
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // The empty array ensures this effect runs only once on mount

  // Return the current authentication status
  return isAuthenticated;
};

export default useAuth;
