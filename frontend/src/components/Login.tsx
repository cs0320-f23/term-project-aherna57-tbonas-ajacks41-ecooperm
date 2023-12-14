import { useState } from "react";
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

/**The Login component is a React functional component responsible for rendering a login screen. It integrates Google OAuth 
 * for user authentication and provides a seamless login experience. Additionally, it includes a dynamic video background that transitions 
 * between different video clips. The component uses mocked user data for testing purposes, allowing developers to simulate a successful 
 * login without relying on Google authentication. The overall purpose of the file is to present a visually appealing and user-friendly 
 * login interface with integrated Google login functionality. */

// Right now if you login via google, it will use your google account information to fill in the user profile
// You can change this by uncommenting the indicated lines below and commenting out everything else in handleLogin

// Functional component definition for the Login component
export const Login = () => {
  // React Router navigation hook
  const navigate = useNavigate();

  // Function to handle login, invoked on successful Google login
  const handleLogin = (response: CredentialResponse) => {
    // Uncomment the following lines to use the mocked user and comment out the above code
    const obj = userMockSchema;
    localStorage.setItem("user", JSON.stringify(obj));
    console.log("Decoded token:", obj);
    navigate("/");
  };

  // Array of video sources and state variables for video playback control
  const videos = [vid1, vid2, vid3, vid4];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Function to handle video end, triggering a fade-out effect and updating the current video
  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentVideo((currentVideo + 1) % videos.length);
      setIsFadingOut(false);
    }, 500);
  };

  // Dynamic class name for video element based on fading state
  const videoClassName = isFadingOut ? "video fade-out" : "video fade-in";

  // JSX structure for the Login component
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
        <h1 className="welcome-message">
          Bear <img className="iconTop" src="/logo.png" alt="Logo"></img>Bites
        </h1>
        <div className="google-button">
          {/* Google Login component */}
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("errorrrrr")}
          />
        </div>

        <h1 className="tease-message">
          Taste the Providence, one review at a time.
        </h1>
      </div>
    </div>
  );
};

// Default export for the Login component
export default Login;
