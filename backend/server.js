// const express = require('express');
import express from "express";
import cookieparser from "cookie-parser";


import pool from "./db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

const app = express();
app.use(cookieparser());
const PORT = process.env.PORT || 5000;

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
    return;
  }
  console.log("Connected to PostgreSQL database");
  release();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/leaderboard", leaderboardRoutes);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: {
      message: err.message,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
