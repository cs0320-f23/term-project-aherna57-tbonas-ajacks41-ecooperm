import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

//import Login from ".";
//import Home from "./home";

import { type AppType } from "next/app";
import "~/src/styles/global.css";
import { api } from "../utils/api";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { env } from "process";
import { useRouter } from "next/router";
import { ClerkProvider } from '@clerk/nextjs'


const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Bear Bites</title>
        <meta name="description" content="WIP" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Toaster position="bottom-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
