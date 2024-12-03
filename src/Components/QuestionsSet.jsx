import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Calling the API:
const fetchQuestions = async (topic, level) => {
  try {
    const response = await fetch(
      `https://ya3wloujj2.execute-api.us-east-1.amazonaws.com/dev/${topic}/${level}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await response.json();
    return data.questions; // Assuming the API returns an object with a "questions" array
  } catch (error) {
    console.error("Error fetching questions: ", error);
    return [];
  }
};

const QuestionsSet = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract topic and level from query parameters
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");
  const level = queryParams.get("level");

  // State management for questions, answers, and modal
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hintText, setHintText] = useState("");

  // Fetch questions based on the topic and level
  useEffect(() => {
    if (topic && level) {
      setLoading(true);
      setError("");
      const loadQuestions = async () => {
        const questionsData = await fetchQuestions(topic, level);
        if (questionsData.length === 0) {
          setError("No questions found for this topic and level.");
        }
        setQuestions(questionsData);
        setLoading(false);
      };

      loadQuestions();
    } else {
      setError("Topic or level is missing.");
      setLoading(false);
    }
  }, [topic, level]);

  const handleOptionChange = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all questions are answered
    if (Object.keys(userAnswers).length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    const score = questions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);

    navigate("/result", {
      state: { score, total: questions.length, questions, userAnswers },
    });
  };

  const handleShowHint = (hint) => {
    setHintText(hint);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setHintText("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <div
        className="text-center p-4 shadow rounded bg-light"
        style={{ width: "60%" }}
      >
        <h2 className="fw-bold mb-4">{topic} Quiz</h2>

        {loading && <p>Loading questions...</p>}
        {error && <p className="text-danger">{error}</p>}

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
                    checked={userAnswers[index] === option}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
              {/* Hint Button */}
              {(level === "Easy" || level === "Medium") && (
                <button
                  type="button"
                  className="btn btn-info mt-2"
                  onClick={() => handleShowHint(q.hint)}
                >
                  Hint
                </button>
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>

      {/* Modal for Hint */}
      {showModal && (
        <div className="modal show d-block" style={{ zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hint</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{hintText}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsSet;
