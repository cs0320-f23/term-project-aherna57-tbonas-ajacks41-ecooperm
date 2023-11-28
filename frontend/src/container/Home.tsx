import React, { useState, useRef, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import Restaurant from "../components/RestaurantProfile";
import { userQuery } from "../utils/data";
import { decodedMockResponse } from "../mockedUser/user1Mock";


//// for now you can use the information from the decoded Mock Response directly to design the home page (name, img, etc.)
//// we will also need to create mock restaurant profiles

const Home = () => {
  // ignore this, this is to check whether the user is logged in or not (forces someone to the login page)
  const userItem = localStorage.getItem("user");
  const userInfo = userItem && userItem !== "undefined" ? JSON.parse(userItem) : localStorage.clear();
  const query = userQuery(userInfo?.sub);

  return (

    // also ignore this part, but dont delete
    <div>
      Home
      <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route
          path="/restaurant-profile/:restaurantId"
          element={<Restaurant />}
        />
        <Route path="/*" />
      </Routes>
    </div>
  );
};

export default Home;
