// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register({ onRegister, navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onRegister();
      navigate('/login');
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <p>Already registered? <Link to="/">Login here</Link>.</p>
    </div>
  );
}

export default Register;
