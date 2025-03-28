import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Store credentials in localStorage if they are not already stored
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    // If credentials are not saved, set them for future logins
    if (!savedEmail || !savedPassword) {
      localStorage.setItem('email', 'eve.holt@reqres.in');
      localStorage.setItem('password', 'cityslicka');
    }

    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/users'); // Redirect to users page if token exists
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Get saved email and password from localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    // Validate email and password against localStorage
    if (email === savedEmail && password === savedPassword) {
      // Save a token (you can replace this with a real token later if needed)
      localStorage.setItem('token', 'dummy-token'); // Store a dummy token for now
      navigate('/users'); // Redirect to users page after successful login
    } else {
      setError('Invalid email or password.'); // Show error message if credentials don't match
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error if invalid login */}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
