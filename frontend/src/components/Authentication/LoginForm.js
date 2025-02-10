import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSeller } from '../../context/SellerContext';
import './Auth.css';

const LoginForm = () => {
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAsSeller } = useSeller();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if it's a seller login
    if (loginAsSeller(formInputs.email, formInputs.password)) {
      navigate('/seller/home');
      return;
    }

    // Regular user login
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue shopping</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formInputs.email}
              onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formInputs.password}
              onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-alternatives">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="auth-link">
              Sign Up
            </a>
          </p>
          <p>
            <a href="/home" className="auth-link">
              Continue as Guest
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
