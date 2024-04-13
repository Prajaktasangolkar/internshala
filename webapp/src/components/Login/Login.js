import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Import CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterLink, setShowRegisterLink] = useState(false); // New state to control showing register link
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      const token = response.data;
      console.log(token, "token");
      console.log("login login");
      if (response.status === 200) {
        console.log(error, "ok");
        console.log('username',username);
        navigation("/game", { state: { username } }); // Pass username as state
      }
    } catch (error) {
      console.log(error, "err3");
      setError("Something went wrong");

      if (error.response && error.response.status === 401) {
        // Show register link if user is not registered
        setShowRegisterLink(true);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="inputGroup">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      {
        <p className="registerText">
          Not registered?{" "}
          <Link to="/register" className="registerLink">
            Register here
          </Link>
        </p>
      }
    </div>
  );
}

export default Login;
