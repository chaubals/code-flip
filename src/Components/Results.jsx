import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, questions, userAnswers } = location.state || {
    score: 0,
    total: 0,
    questions: [],
    userAnswers: {},
  };

  const calculatePercentage = () => ((score / total) * 100).toFixed(2);

  return (
    <div className="d-flex justify-content-center align-items-center vh-50">
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
            {score} / {total} ({calculatePercentage()}%)
          </div>
        </div>

        <h4 className="mt-4">Answer Key:</h4>
        <div className="text-start">
          {questions.map((q, index) => (
            <div key={index} className="mb-3">
              <p>
                <strong>Q{index + 1}: </strong>
                {q.question}
              </p>
              <p>
                <strong>Your answer:</strong>{" "}
                {userAnswers[index] || "Not answered"}
              </p>
              <p
                className={`${
                  userAnswers[index] === q.answer
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                <strong>Correct answer:</strong> {q.answer}
              </p>
            </div>
          ))}
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
