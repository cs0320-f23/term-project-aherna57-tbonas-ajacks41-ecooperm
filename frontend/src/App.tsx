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

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    console.log(userItem)
    const User = userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;
    if (!User) navigate("/login");
  }, [navigate]);

  return (
      <GoogleOAuthProvider clientId={GOOGLE_API_TOKEN}>
        <div>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
  );
}

export default App;
