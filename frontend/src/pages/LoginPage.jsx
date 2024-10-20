// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful:', response.data);
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');

    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="input"
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="input"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="submit-button"
          >
            Login
          </button>
          
          <div className="flex-container">
            <p className="signup-text">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="signup-button"
              >
                Signup
              </button>
            </p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
