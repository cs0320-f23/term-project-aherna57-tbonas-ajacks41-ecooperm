import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Make sure to import this correctly
import Login from "./components/Login";
import Home from "./container/Home";
import { GOOGLE_API_TOKEN } from "./private/api";
import { useState } from "react";


function App() {

  return (
    <Router>
      {/* You need to provide a valid Google API token here! */}
      <GoogleOAuthProvider clientId={GOOGLE_API_TOKEN}>
        <div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </Router>
    
  );
}

export default App;
