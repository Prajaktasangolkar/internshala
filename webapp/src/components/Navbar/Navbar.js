
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navbar.css';

function Navbar() {
  const location = useLocation();
  const username = location.state && location.state.username; // Access username from location state

 
  return (
    <nav>
      <ul>
        <li>
          <Link to="/game">GameTab</Link>
        </li>
        <li>
          <Link to="/leaderboard">LeaderboardTab</Link>
        </li>
      
        {username && (
          <li >
            <span>Welcome, {username} !</span> {/* Display username */}
          </li>
        )}

          <li style={{position:'absolute',right:'0px'}}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
