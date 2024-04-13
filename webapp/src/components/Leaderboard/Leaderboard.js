// components/LeaderboardTab.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import './leaderboard.css'
function LeaderboardTab() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [timeWindow, setTimeWindow] = useState(5); // Default time window of 5 minutes
 // Add state for username
  const [username,setUsername]=useState('')
  useEffect(() => {
    // Fetch leaderboard data initially and subscribe to WebSocket for real-time updates
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leaderboard?interval=${timeWindow}`
        );
        setLeaderboard(response.data);
        setUsername(response.data[0].username)
      
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
    <div className="cont" class="opacity-50">
      <Navbar />
                    <h1 style={{'color':'white',display:'flex',justifyContent:'center'}}>Leaderboard Tab</h1>
      <Container className="d-flex justify-content-center container">
        
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className='cardtitle'>HighPointUser :{username}</Card.Title>
                <Card.Text>
                  <div>
                    
                    <div>
                      <h2>Leaderboard for Past {timeWindow} Minutes</h2>
                      <button onClick={() => handleTimeWindowChange(5)}>
                        5 Minutes
                      </button>
                      <button onClick={() => handleTimeWindowChange(10)}>
                        10 Minutes
                      </button>
                      <button onClick={() => handleTimeWindowChange(30)}>
                        30 Minutes
                      </button>
                      <button onClick={() => handleTimeWindowChange(60)}>
                        1 Hour
                      </button>
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
                  </div>{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LeaderboardTab;
