import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import Login from ".";
//import Home from "./home";

import { type AppType } from "next/app";
import "~/src/styles/global.css";
import { api } from "../utils/api";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { env } from "process";

// function App() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userItem = localStorage.getItem("user");
//     console.log(userItem);
//     const User =
//       userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;
//     if (!User) navigate("/login");
//   }, [navigate]);

//   return (
//     <GoogleOAuthProvider clientId={process.env.GOOGLE_API_TOKEN!}>
//       <div>
//         <Routes>
//           <Route path="login" element={<Login />} />
//           <Route path="/*" element={<Home />} />
//         </Routes>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE!}>
      <Head>
        <title>Bear Bites</title>
        <meta name="description" content="WIP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
};

export default api.withTRPC(MyApp);
