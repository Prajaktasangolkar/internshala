import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.get("/", validateUser, async (req, res) => {
  return res.status(200).json({ user: req.user });
});
// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body,'reg log');

  // Check if the username already exists in the database
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
    
  } catch (error) {
    console.error("Error checking existing username:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  // Validate user credentials
  const { username, password } = req.body;
  console.log(req.body, "heyyy");

  // Fetch user from database
  try {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    console.log(result, "qyue");
    const user = result.rows[0];
    console.log(user, "user");

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password 1" });
    } else {
      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch, "pass");
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password 2" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.user_id, username: username },
        "secret",
        {
          expiresIn: "1h",
        }
      );

      res.cookie("jwt", token);

      // Send token to the client
      res.status(200).json({message:"login successfully"});
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
