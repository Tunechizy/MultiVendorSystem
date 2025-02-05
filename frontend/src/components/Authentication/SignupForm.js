import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const [formInputs, setFormInputs] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer', // Default role is buyer
  });

  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const updateInput = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formInputs);
      console.log('User signed up:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMsg(error.response?.data?.error || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={onFormSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formInputs.username}
          onChange={updateInput}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formInputs.email}
          onChange={updateInput}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formInputs.password}
          onChange={updateInput}
          required
        />
        <select name="role" value={formInputs.role} onChange={updateInput} required>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <p>
        Already have an account?{' '}
        <span className="link" onClick={() => navigate('/home')}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
