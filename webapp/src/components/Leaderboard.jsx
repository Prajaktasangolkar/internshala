// components/LeaderboardTab.js

import React, { useState, useEffect } from "react";
import axios from "axios";    
import Navbar, {navbar} from './Navbar'
function LeaderboardTab() {
  
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeWindow, setTimeWindow] = useState(5); // Default time window of 5 minutes

  useEffect(() => {
    // Fetch leaderboard data initially and subscribe to WebSocket for real-time updates
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leaderboard?interval=${timeWindow}`
        );
        setLeaderboard(response.data);

        // WebSocket connection for real-time updates
        const ws = new WebSocket("ws://localhost:8000"); // WebSocket server address
        ws.onopen = () => {
          console.log("WebSocket connected");
        };
        ws.onmessage = (event) => {
          const updatedLeaderboard = JSON.parse(event.data);
          setLeaderboard(updatedLeaderboard);
        };
        ws.onclose = () => {
          console.log("WebSocket closed");
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
          ws.close();
        };
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, [timeWindow]);

  const handleTimeWindowChange = (window) => {
    setTimeWindow(window);
  };

  return (
    <div>
      <Navbar/>
      <h1>Leaderboard Tab</h1>
      <div>
        <h2>Leaderboard for Past {timeWindow} Minutes</h2>
        <button onClick={() => handleTimeWindowChange(5)}>5 Minutes</button>
        <button onClick={() => handleTimeWindowChange(10)}>10 Minutes</button>
        <button onClick={() => handleTimeWindowChange(30)}>30 Minutes</button>
        <button onClick={() => handleTimeWindowChange(60)}>1 Hour</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blue Triangles Clicked</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTab;
