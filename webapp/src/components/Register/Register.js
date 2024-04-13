import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'; // Import CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      const token = response.data;
      localStorage.setItem('token', token);
      navigation('/');
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Register</h2>
      <form onSubmit={handleRegister} className="form">
        <div className="inputGroup">
          <label className="label">Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
        </div>
        <div className="inputGroup">
          <label className="label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </div>
        <button type="submit" className="button">Register</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p className="loginText">Already registered? <Link to="/" className="loginLink">Login here</Link>.</p>
    </div>
  );
}

export default Register;
