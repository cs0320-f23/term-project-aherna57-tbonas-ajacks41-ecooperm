import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Home from "./container/Home";
import { GOOGLE_API_TOKEN } from "./private/api";

/**The file App.js serves as the main entry point for the application. It uses React Router to define routes for the login and home pages. 
 * The useEffect hook checks whether user data is stored in local storage, and if not, it redirects the user to the login page. 
 * The application is wrapped in GoogleOAuthProvider to enable Google OAuth authentication. 
 * Overall, the file orchestrates the routing and authentication setup for the application. */

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data is stored in local storage
    const userItem = localStorage.getItem("user");

    // Parse user data if available, otherwise set User to null
    const User =
      userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;

    // Redirect to the login page if no user data is found
    if (!User) navigate("/login");
  }, [navigate]);

  return (
    // Wrap the application with the GoogleOAuthProvider for authentication
    <GoogleOAuthProvider clientId={GOOGLE_API_TOKEN}>
      <div>
        {/* Define routes for the login and home pages */}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
