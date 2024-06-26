import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import beepSound from "../../assests/beep.mp3";
import Navbar from "../Navbar/Navbar";
import "./gametab.css";


const triangle = (color) => {
  return {
    height: 0,
    width: 0,
    borderLeft: "25px  solid transparent",
    borderRight: "25px  solid transparent",
    borderBottom: `50px solid ${color}`,
    cursor: "pointer",
  };
};

function GameTab() {
  const [shapes, setShapes] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const fetchShapesData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/game/shapes"
        ); // Use relative URL
       
        setShapes(response.data);
      } catch (error) {
        console.error("Error fetching shapes data:", error);
      }
    };

    fetchShapesData();

    const interval = setInterval(() => {
      fetchShapesData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleShapeClick = async (shapeId, shapeColor, shapeType) => {
    try {
      if (shapeColor === "blue" && shapeType === "triangle") {
        setConfettiActive(true);
        fetch("http://localhost:5000/api/leaderboard/add_points", {
          method: "post",
          credentials: "include",
        });
        setTimeout(() => {
          setConfettiActive(false);
        }, 2000);
      } else {
        const audio = new Audio(beepSound);
        audio.play();
      }
    } catch (error) {
      console.error("Error handling shape click:", error);
    }
  };

  return (
    <div className="game-container">
    <Navbar />
    
    <h1 style={{'display':'flex','justify-content':'center'}}>Game Tab</h1>
    <p>Rules:</p>
    <ul style={{ listStyleType: "disc" , 'display':'flex','flex-direction':'column'}}>
      <li>
        Click on blue triangles to earn 10 points and see confetti burst.
      </li>
      <li>
        Click on any shape other than blue triangles to hear a beep sound.
      </li>
    </ul>

    <div className="play-area" style={{ display: "flex" ,'margin':'40px 10px 40px 10px'}}>
      {shapes.map((shape) => (
           <div
           key={shape.id}
           style={
             shape.type == "triangle"
               ? triangle(shape.color)
               : {
                   width: "50px",
                   height: "50px",
                   margin: "10px",
                   backgroundColor: shape.color,
                   borderRadius: shape.type === "circle" ? "50%" : "0%",
                   cursor: "pointer",
                 }
           }
           onClick={() => handleShapeClick(shape.id, shape.color, shape.type)}
         ></div>
      ))}
    </div>
    {confettiActive && <Confetti />}
  </div>
  );
}

export default GameTab;

