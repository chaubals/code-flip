import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const initialTopics = [
    "DSA",
    "OOP",
    "Java",
    "C#",
    "Python",
    "React.js",
    "Node.js",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
  ];

  const [topics, setTopics] = useState(initialTopics); // State to manage filtered topics
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setTopics(initialTopics); // Reset to the full list when input is cleared
    } else {
      const filteredTopics = initialTopics.filter((topic) =>
        topic.toLowerCase().startsWith(query.toLowerCase())
      );
      setTopics(filteredTopics);
    }
  };

  return (
    <div>
      <div className="container mt-0">
        <h2 className="text-center mb-4 fw-bold mt-3">
          Hello! Ready for a quiz?
        </h2>
        <div className="d-flex flex-column mb-2">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search topic"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch} // Update topics as user types
          />
        </div>
        <div className="container w-100">
          <div className="row d-flex justify-content-center">
            {topics.length > 0 ? (
              topics.map((topic, index) => (
                <div
                  key={topic}
                  className="col-md-4 mb-3" // This ensures that each card takes half of the row on medium and larger screens
                >
                  <div
                    className="card topic-card bg-body-secondary"
                    onClick={() => navigate(`/level?topic=${topic}`)} // Passing the topic to DifficultyLevel page
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title">{topic}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No topics found</p> // Message when no matches
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
