import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  decodedMockResponse,
  userMockSchema,
} from "../mockedUser/user1Mock";
import styles from "../styles/login.module.css";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { SignIn, SignUp } from "@clerk/nextjs";

const BearBitesVid = () => {
  const videos = ["/vid1.mp4", "/vid2.mp4", "/vid3.mp4", "/vid4.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentVideoIndex((currentVideoIndex + 1) % videos.length);
      setIsFadingOut(false);
    }, 500);
  };

  const videoClassName = isFadingOut
    ? `${styles.video} ${styles.fadeOut}`
    : `${styles.video} ${styles.fadeIn}`;

  return (
    <video
      src={videos[currentVideoIndex]}
      loop={false}
      controls={false}
      muted
      autoPlay={true}
      onEnded={handleVideoEnd}
      className={videoClassName}
    />
  );
};

// Right now if you login via google, it will use your google account information to fill in the user profile
// You can change this by uncommenting the indicated lines below and commenting out everything else in handleLogin
export const Login = () => {
  return (
    <div className={styles.mainContainer}>
      <BearBitesVid />
      <div className={styles.loginForm}>
        <h1 className={styles.welcomeMessage}>
          Bear <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>
          Bites
        </h1>
        <div className={styles.googleButton}>
          <SignIn />
        </div>

        <h1 className={styles.teaseMessage}>
          Taste the Providence, one review at a time.
        </h1>
      </div>
    </div>
  );
};

export default Login;
