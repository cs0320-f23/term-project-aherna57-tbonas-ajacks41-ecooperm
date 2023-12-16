import React, { useState, useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { decodedMockResponse, userMockSchema } from "../mockedUser/user1Mock";
import styles from "../styles/login.module.css";

import vid1 from "../assets/vid1.mp4";
import vid2 from "../assets/vid2.mp4";
import vid3 from "../assets/vid3.mp4";
import vid4 from "../assets/vid4.mp4";

import { useRouter } from "next/router";
import Cookies from "js-cookie";

// Right now if you login via google, it will use your google account information to fill in the user profile
// You can change this by uncommenting the indicated lines below and commenting out everything else in handleLogin
export const Login = () => {
   const router = useRouter();
  // const navigate = useNavigate();
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
    //   // ****** uncomment the following lines to use the mocked user and comment out the above code *******
    const obj = userMockSchema;
    
    Cookies.set("user", JSON.stringify(obj));
    console.log("user:", Cookies.get("user"));
    console.log("Decoded token:", obj);

    router.push("/home");
  }

  const videos = [vid1, vid2, vid3, vid4];
  const [currentVideo, setCurrentVideo] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentVideo((currentVideo + 1) % videos.length);
      setIsFadingOut(false);
    }, 500);
  };


  const videoClassName = isFadingOut
    ? `${styles.video} ${styles.fadeOut}`
    : `${styles.video} ${styles.fadeIn}`;

  return (
    <div className={styles.mainContainer}>
      <video
        src={require(`../assets/vid${currentVideo}.mp4`)}
        loop={false}
        controls={false}
        muted
        autoPlay={true}
        onEnded={handleVideoEnd}
        className={videoClassName}
      />

      <h1 className={styles.welcomeMessage}>Welcome Back!</h1>

      <div className={styles.loginForm}>
        <h1 className={styles.welcomeMessage}>
          Bear <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>Bites
        </h1>
        <div className={styles.googleButton}>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("errorrrrr")}
          />
        </div>

        <h1 className={styles.teaseMessage}>
          Taste the Providence, one review at a time.
        </h1>
      </div>
    </div>
  );
};

export default Login;
