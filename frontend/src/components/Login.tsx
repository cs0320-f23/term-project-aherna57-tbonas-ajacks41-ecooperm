import React, { useState, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { decodedMockResponse } from "../mockedUser/user1Mock";


// Right now if you login via google, it will use your google account information to fill in the user profile
// You can change this by uncommenting the indicated lines below and commenting out everything else in handleLogin
export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (response: CredentialResponse) => {
    console.log("login is a success");

    console.log("login response:", response);
    if (response.credential) {
      const obj = jwtDecode(response.credential); 
      localStorage.setItem("user", JSON.stringify(obj));
      console.log("decoded token:", obj);
      navigate("/");
    } else {
      console.log("credential is undefined");
    }

    // ****** uncomment the following lines to use the mocked user and comment out the above code *******
    // const obj = decodedMockResponse;
    // console.log("Decoded token:", obj);
    // navigate("/");
  };

  return (
    <div>
      Login
        <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("error!!!!")}
        />
    </div>
  );
};

export default Login;
