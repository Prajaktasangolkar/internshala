import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterLink, setShowRegisterLink] = useState(false); // New state to control showing register link

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      onLogin(); // Callback to inform parent component (e.g., App) about successful login
    } catch (error) {
      setError('Invalid username or password');
      if (error.response && error.response.status === 401) {
        // Show register link if user is not registered
        setShowRegisterLink(true);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
      </form>
      { (
        <p>
          Not registered? <Link to="/register">Register here</Link>
        </p>
      )}
    </div>
  );
}

export default Login;
