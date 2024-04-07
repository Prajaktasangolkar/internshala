// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


function Register({ navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigation=useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      console.log(error)
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      const token = response.data;
      console.log(token,'token');
      localStorage.setItem('token', token);
       console.log(error)
       navigation('/')
      // navigate('/login');
    } catch (error) {   console.log(error)
      setError('Failed to register. Please try again.',error);   console.log(error)
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
      <p >Already registered? <Link to="/" style={{color:'red'}}>Login here</Link>.</p>
    </div>
  );
}

export default Register;
