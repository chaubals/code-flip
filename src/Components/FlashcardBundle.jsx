import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const questionsData = {
  DSA: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(n log n)"],
      answer: "O(log n)",
    },
    {
      question: "What data structure is used for BFS?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      answer: "Queue",
    },
  ],
  OOP: [
    {
      question: "What does OOP stand for?",
      options: [
        "Object-Oriented Programming",
        "Operational Output Programming",
        "Optimal Object Program",
        "None",
      ],
      answer: "Object-Oriented Programming",
    },
  ],
};

const FlashcardBundle = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [userAnswers, setUserAnswers] = useState({});
  const questions = questionsData[topic] || [];

  const handleOptionChange = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);

    navigate("/result", { state: { score, total: questions.length } });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="text-center p-4 shadow rounded bg-light"
        style={{ width: "60%" }}
      >
        <h2 className="fw-bold mb-4">{topic} Quiz</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 text-start">
              <h5>{q.question}</h5>
              {q.options.map((option, idx) => (
                <div key={idx} className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleOptionChange(index, option)}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlashcardBundle;
