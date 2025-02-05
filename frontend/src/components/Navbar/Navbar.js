import React from "react";
import { useNavigate } from "react-router-dom"; // Importing the navigation hook from react-router-dom
import "./Navbar.css"; // Importing the CSS for styling

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  return (
    <nav className="navbar">
      {/* Navbar menu that adjusts based on the authentication status of the user */}
      <ul className="navbar-menu">
        {user ? (
          <>
            {/* If user is logged in, show 'Home' and 'Logout' links */}
            <li onClick={() => navigate("/home")}>Home</li> {/* Navigate to home */}
            <li onClick={handleLogout}>Logout</li> {/* Call handleLogout function */}
          </>
        ) : (
          <>
            {/* If user is not logged in, show 'Login' and 'Sign Up' links */}
            <li onClick={() => navigate("/login")}>Login</li> {/* Navigate to login */}
            <li onClick={() => navigate("/signup")}>Sign Up</li> {/* Navigate to sign up */}
          </>
        )}
      </ul>

      {/* Conditionally render a welcome message when the user is logged in */}
      {user && (
        <div className="welcome-message">
          <h2>Welcome, {user.email}!</h2> {/* Display user's email as part of the welcome message */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
