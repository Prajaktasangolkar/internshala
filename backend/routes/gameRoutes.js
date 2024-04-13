import express from "express";
import { getRandomNumber } from "../utils.js";
const router = express.Router();

// Dummy data for shapes (replace this with your actual data source)

const shapes = ["square", "circle", "triangle"];
const colors = ["red", "blue", "yellow"];

router.get("/shapes", (req, res) => {
  const minShapes = 5;
  const maxShapes = 15;
  const shapesData = [];

  const shapesToAdd = getRandomNumber(minShapes, maxShapes);

  if (shapesToAdd > 0) {
    // Add new shapes if needed
    for (let i = 0; i < shapesToAdd; i++) {
      const shapeIndex = getRandomNumber(0, shapes.length);
      const colorIndex = getRandomNumber(0, colors.length);
      const newShape = {
        id: shapesData.length + 1,
        type: shapes[shapeIndex],
        color: colors[colorIndex],
      };
      shapesData.push(newShape);
    }
  } else if (shapesToAdd < 0) {
    // Remove excess shapes if needed
    shapesData.splice(0, Math.abs(shapesToAdd));
  }

  // Return the updated shapes data as JSON
  // res.set("Access-Control-Allow-Origin","*")

  res.json(shapesData);

  // Return the shapes data as JSON
  // res.json(shapesData);
});

export default router;
