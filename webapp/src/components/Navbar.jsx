import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

function Navbar() {
  return (
    <nav>
      <ul>
          <>
          <li>
          <Link to="/game">GameTab</Link>
        </li>
            <li>
              <Link to="/leaderboard">LeaderboardTab</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        
      </ul>
    </nav>
  );
}

export default Navbar;
