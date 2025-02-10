import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/Authentication/Auth.css";
import "./components/Navbar/Navbar.css";
import LoginForm from "./components/Authentication/LoginForm";
import SignupForm from "./components/Authentication/SignupForm";
import Homepage from "./components/home";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from './components/Cart/Cart';
import CartIndicator from './components/CartIndicator/CartIndicator';
import { ToastContainer } from 'react-toastify';
import { SellerProvider } from './context/SellerContext';
import SellerDashboard from './components/Seller/SellerDashboard';
import SellerHome from './components/Seller/SellerHome';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductProvider } from './context/ProductContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isSeller = user && user.email.endsWith("@seller.com");

  return (
    <ProductProvider>
      <SellerProvider>
        <CartProvider>
          <div className="App">
            <ToastContainer position="top-right" />
            {!isSeller && <CartIndicator />}
            <header className="App-header">
              <div className="header-content">
                <h1 className="site-title">Pop Shop</h1>
                <p className="site-subtitle">Your One-Stop Shopping Destination</p>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                {isSeller && (
                  <Button 
                    variant="outline-light" 
                    onClick={() => navigate('/seller/dashboard')}
                    className="add-product-btn"
                  >
                    Add Product
                  </Button>
                )}
              </div>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/home" element={<SellerHome />} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </SellerProvider>
    </ProductProvider>
  );
}

export default App;
