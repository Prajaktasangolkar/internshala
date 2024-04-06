import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component
import GameTab from './components/GameTab';
import LeaderboardTab from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user data or check authentication status
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user');
        setUser(response.data);
        setIsLoggedIn(true); // Assuming user data received means user is logged in
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={isLoggedIn ? <GameTab user={user} /> : <Login onLogin={handleLogin} />}
        /> */}
                <Route path="/" element={<GameTab />} />

        <Route path="/leaderboard" element={<LeaderboardTab />} />
        <Route path="/register" element={<Register />} /> {/* Define route for Register component */}
      </Routes>
    </Router>
  );
}

export default App;
