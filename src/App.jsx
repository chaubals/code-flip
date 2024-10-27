import React, { useState } from "react";
import awsconfig from './aws-exports'; // Make sure this file is correctly generated
import { Route, Router, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

export default function MyApp() {
    return (
        <div>
        <Authenticator>
            {({ signOut, user }) => (
                <div>
                    <Routes>
                        <Route path="/" element = {<HomePage/>} />
                        <Route path="/flashcards/:topic" element= {<FlashcardBundle/>} />
                    </Routes>
                    <button className="button-signout" onClick={signOut}>Sign out</button>
                </div>
            )}
        </Authenticator>
        </div>
    );
}