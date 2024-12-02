import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="text-center p-5 shadow rounded bg-light"
        style={{ width: "50%", minWidth: "300px" }}
      >
        <h2 className="fw-bold mb-4">Quiz Results</h2>
        <div className="fs-3 mb-4">
          <p className="fw-bold">Your score:</p>
          <div
            className={`display-4 ${
              score === total
                ? "text-success"
                : score >= total / 2
                ? "text-warning"
                : "text-danger"
            }`}
          >
            {score} / {total}
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-success mt-4"
          style={{ padding: "10px 20px", fontSize: "1.1rem" }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
