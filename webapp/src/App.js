import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import GameTab from "./components/Gametab/GameTab";
import LeaderboardTab from "./components/Leaderboard/Leaderboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch user data or check authentication status
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth", {
          credentials: "include",
        });
        setIsLoggedIn(response.status === 200); // Assuming user data received means user is logged in
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logic for logging out, such as clearing local storage, etc.
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route path="/game" element={<GameTab />} />
        <Route path="/leaderboard" element={<LeaderboardTab />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn && (
          <Route path="/logout" element={<Navigate to="/" />} /> 
         
        )}
      </Routes>
      
    </Router>
  );
}

export default App;
