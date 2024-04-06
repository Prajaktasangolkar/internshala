import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { validateUser } from "../middlewares/validateUser.js";
import pool from "../db.js";

let leaderboard = [];

router.get("/", async (req, res) => {
  const { interval } = req.query;
  const validIntervals = [5, 10, 30, 60];
  if (!validIntervals.includes(parseInt(interval))) {
    return res.status(400).json({ message: "invalid interval" });
  }
  try {
    const result =
      await pool.query(`select username,count(username)*10 as points from blue_triangle_clicks where clicked_at BETWEEN NOW() - INTERVAL '${interval} MINUTES' and NOW() GROUP BY username ORDER BY points DESC;
    `);
    return res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add_points", validateUser, async (req, res) => {
  const { username } = req.user;
  try {
    const result = await pool.query(
      `INSERT INTO blue_triangle_clicks(username) values('${username}')`
    );
    if (result.rowCount < 1) {
      throw new Error("Something went wrong");
    }
    res.status(201).json({ message: "Added 10 points" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
