import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn }) {
  return (
    <nav>
      <ul>
          <>
          <li>
          <Link to="/">GameTab</Link>
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
