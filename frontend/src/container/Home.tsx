import React, { useState, useRef, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import Restaurant from "../components/RestaurantProfile";
import { userQuery } from "../utils/data";
import { decodedMockResponse } from "../mockedUser/user1Mock";
import axios from "axios";
import Result from "./Result";
import Searchbar from "./SearchBar";
import { ResultProps } from "./Result";


//// for now you can use the information from the decoded Mock Response directly to design the home page (name, img, etc.)
//// we will also need to create mock restaurant profiles

const Home = () => {
  // ignore this, this is to check whether the user is logged in or not (forces someone to the login page)
  const userItem = localStorage.getItem("user");
  const userInfo = userItem && userItem !== "undefined" ? JSON.parse(userItem) : localStorage.clear();
  const query = userQuery(userInfo?.sub);

  const [result, setResult] = useState<any[]>([]);

  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );

    return data.products;
  };

  return (
    <div>
      <h1 className="header">
        Bear &nbsp; <img className="iconTop" src="/logo.png"></img> &nbsp; Bites
      </h1>
      <hr></hr>
      <p></p>

      <div>
        <Searchbar
          fetchData={fetchData}
          setResult={setResult}
          suggestionKey="title"
        />
        {result.map((item: ResultProps, index: number) => (
          <Result key={index} {...item} />
        ))}
      </div>
      <div>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route
            path="/restaurant-profile/:restaurantId"
            element={<Restaurant />}
          />
          <Route path="/*" />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
