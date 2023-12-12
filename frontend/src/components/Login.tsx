import React, { useState, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { decodedMockResponse, userMockSchema } from "../mockedUser/user1Mock";
import "../styles/Login.css";

// Right now if you login via google, it will use your google account information to fill in the user profile
// You can change this by uncommenting the indicated lines below and commenting out everything else in handleLogin
export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (response: CredentialResponse) => {
    // console.log("login is a success");

    // console.log("login response:", response);
    // if (response.credential) {
    //   const obj = jwtDecode(response.credential); 
    //   localStorage.setItem("user", JSON.stringify(obj));
    //   console.log("decoded token:", obj);
    //   navigate("/");
    // } else {
    //   console.log("credential is undefined");
    // }

    // ****** uncomment the following lines to use the mocked user and comment out the above code *******
    const obj = userMockSchema;
    localStorage.setItem("user", JSON.stringify(obj));
    console.log("Decoded token:", obj);
    navigate("/");
  };

  return (
    <div className="main-container">
      <h1 className="welcome-message">Bear Bites</h1>

      <div className="login-form">
        <div className="google-button">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("errorrrrr")}
          />
        </div>
      </div>

    </div>
  );
};

export default Login;
