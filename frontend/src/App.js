


// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes and Route (no need for BrowserRouter here)
// import './App.css';
// import './components/Authentication/Auth.css';
// import './components/Navbar/Navbar.css';
// import LoginForm from './components/Authentication/LoginForm';
// import SignupForm from './components/Authentication/SignupForm';
// import Navbar from './components/Navbar/Navbar';
// import Homepage from './components/home';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const email = localStorage.getItem('userEmail');
//     if (token && email) {
//       setUser({ email });
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
//     setUser(null);
//   };

//   return (
//     <div className="App">
//       <Navbar user={user} handleLogout={handleLogout} />
//       <header className="App-header">
//         <h1>Multi-Vendor Platform</h1>
//       </header>
//       <main>
//         <Routes>
//         <Route path="/" element={<LoginForm />} />

//           {/* Login page */}
//           <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginForm setUser={setUser} />} />

//           {/* Signup page */}
//           <Route path="/signup" element={<SignupForm />} />

//           {/* Home page, accessible only if the user is logged in */}
//           <Route path="/home" element={user ? <Homepage user={user} /> : <Navigate to="/login" />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import './components/Authentication/Auth.css';
// import './components/Navbar/Navbar.css';
// import LoginForm from './components/Authentication/LoginForm';
// import SignupForm from './components/Authentication/SignupForm';
// import Navbar from './components/Navbar/Navbar';
// import Homepage from './components/home';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [user, setUser] = useState(null);

//   // UseEffect only runs once when the component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const email = localStorage.getItem('userEmail');

//     // Set user state only if the token and email are available
//     if (token && email) {
//       setUser({ email });
//     }
//   }, []); // Empty array ensures this runs only once when the component mounts

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userEmail');
//     setUser(null);
//   };

//   return (
//     <div className="App">
//       <Navbar user={user} handleLogout={handleLogout} />
//       <header className="App-header">
//         <h1>Multi-Vendor Platform</h1>
//       </header>
//       <main>
//         <Routes>
//           {/* If user is logged in, go to home page, otherwise go to login */}
//           <Route
//             path="/"
//             element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
//           />

//           {/* Login page */}
//           <Route
//             path="/login"
//             element={user ? <Navigate to="/home" /> : <LoginForm setUser={setUser} />}
//           />

//           {/* Signup page */}
//           <Route path="/signup" element={<SignupForm />} />

//           {/* Home page, accessible only if the user is logged in */}
//           <Route
//             path="/home"
//             element={user ? <Homepage user={user} /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;









import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./components/Authentication/Auth.css";
import "./components/Navbar/Navbar.css";
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setUser({ email });
    }
    setLoading(false); // Mark loading as complete
  }, []); // Empty dependency ensures this runs only once when the component mounts

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while checking for user state
  }

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      <header className="App-header">
        <h1>Multi-Vendor Platform</h1>
      </header>
      <main>
        <Routes>
          {/* Root route: Redirect to home if logged in, else to login */}
          {/* <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
          /> */}

          {/* Login page */}
          {/* <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <LoginForm setUser={setUser} />}
          /> */}

          <Route path="/login" element={<LoginForm />} />

          {/* Signup page */}
          <Route path="/signup" element={<SignupForm />} />

          {/* Home page: Accessible only if the user is logged in */}
          <Route path="/home" element={<Homepage />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
