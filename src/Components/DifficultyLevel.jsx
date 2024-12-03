import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DifficultyLevel() {
  const [level, setLevel] = useState(""); //State to manage level
  const navigate = useNavigate();
  const location = useLocation(); //To extract query parameters

  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");

  const handleLevelClick = (selectedLevel) => {
    setLevel(selectedLevel);
    console.log("Selected level: ", selectedLevel);
    //Navigate to the questions page
    navigate(`/questions?topic=${topic}&level=${selectedLevel}`);
  };
  return (
    <div>
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <h2>Topic: {topic}</h2>
        <button
          className="btn btn-primary m-3 w-25 p-3 fw-bold"
          onClick={() => handleLevelClick("Easy")}
        >
          Easy
        </button>
        <button
          className="btn btn-primary m-3 w-25 p-3 fw-bold"
          onClick={() => handleLevelClick("Medium")}
        >
          Medium
        </button>
        <button
          className="btn btn-primary m-3 w-25 p-3 fw-bold"
          onClick={() => handleLevelClick("Hard")}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default DifficultyLevel;
