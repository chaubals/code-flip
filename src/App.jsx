import React from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import Results from "./Components/Results";
import Contact from "./Components/Contact";
import DifficultyLevel from "./Components/DifficultyLevel";
import QuestionsSet from "./Components/QuestionsSet";

Amplify.configure(awsconfig);

export default function App() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            {/* Navbar renders only after login */}
            <Navbar user={user} signOut={signOut} />

            {/* Application Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/level" element={<DifficultyLevel />} />
              <Route path="/questions" element={<QuestionsSet />} />
              <Route path="/result" element={<Results />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        )}
      </Authenticator>
    </div>
  );
}
