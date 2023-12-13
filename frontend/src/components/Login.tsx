import React, { useState, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { decodedMockResponse, userMockSchema } from "../mockedUser/user1Mock";
import "../styles/Login.css";
import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";
import vid3 from "../assets/vid3.mp4";
import vid4 from "../assets/vid4.mp4";




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


  const videos = [vid1, vid2, vid3, vid4];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentVideo((currentVideo + 1) % videos.length);
      setIsFadingOut(false);
    }, 500); // Corresponds to the duration of the fadeOut animation
  };

  const videoClassName = isFadingOut ? "video fade-out" : "video fade-in";

  return (
    <div className="main-container">
      <video
        src={videos[currentVideo]}
        loop={false}
        controls={false}
        muted
        autoPlay={true}
        onEnded={handleVideoEnd}
        className={videoClassName}
      />

      <div className="login-form">
        <h1 className="welcome-message">Bear Bites</h1>

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
