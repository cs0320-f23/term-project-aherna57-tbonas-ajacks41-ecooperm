import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "./users/[userprofile]";
import { userQuery } from "../utils/data";
import axios from "axios";
import Result from "../container/Result";
import Searchbar from "../container/SearchBar";
import { ResultProps } from "../container/Result";
import RestaurantList from "../components/RestaurantList";
import styles from "../styles/home.module.css";
import RestaurantProfile from "./restaurants/[restaurantprofile]";
import { useRouter } from "next/router";
import { api } from "~/src/utils/api";
import { useSession, signIn, signOut } from "next-auth/react";
import Cookies from "js-cookie";

import FilterButtons from "../components/FilterButtons";
import { buttonConfigs } from "../utils/data";
import { LoadingPage } from "../components/loading";

const Home = () => {
  const router = useRouter();

  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  console.log("user:", user);

  const [result, setResult] = useState<any[]>([]);

  const [activeFilterCategory, setActiveFilterCategory] = useState<
    string | null
  >(null);

  const [resetKey, setResetKey] = useState<number>(0); // Add a state to trigger a reset

  const handleResetFilters = () => {
    // Reset all filters
    setActiveFilterCategory(null);
    // Trigger a reset by updating the resetKey
    setResetKey((prevKey) => prevKey + 1);
  };

  //Search Bar Functionality
  const fetchData = async (value: any) => {
    const { data } = await axios.get(
      `https://dummyjson.com/products/search?q=${value}&limit=10`
    );
    return data.products;
  };

  const handleUserImageClick = () => {
    // Navigate to the user profile page
    router.push(`/users/${user.id}`);
  };
  const handleHomeClick = () => {
    // Navigate to the home page
    router.push("/");
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Cookies.get("user");
    setIsLoading(false);
    // fetchUser().then((fetchedUser) => {
    //   setUser(fetchedUser);
    //   setIsLoading(false);
    // });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  function handleLogout() {
    Cookies.remove("user");
    router.push("/login");
    //setTimeout(() => router.push("/login"), 0);
  }

  return (
    <div>
      <h1 className={styles.header}>
        <div
          className={styles.title}
          onClick={handleHomeClick}
          aria-label="Navigate to Home Page"
        >
          Bear <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>{" "}
          Bites
        </div>
        <div className={styles.userIm} onClick={handleUserImageClick}>
          {user && <img src={user.profilePictureURL} alt="Clickable Button" />}
          <div className={styles.dropdownMenu}>
            <button
              className={styles.dropbtn}
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </h1>

      {router.pathname === "/home" && (
        <div>
          {/* Search Bar */}
          <div className={styles.searchBarContainer}>
            <Searchbar
              fetchData={fetchData}
              setResult={setResult}
              suggestionKey="title"
              aria-label="Search Bar"
            />
            {result.map((item: ResultProps, index: number) => (
              <Result
                key={index}
                {...item}
                aria-label={`Search Result ${index + 1}`}
              />
            ))}
            <p className={styles.searchBarLine}></p>{" "}
          </div>

          {/* Row of Buttons */}
          <div className={styles.buttonRow}>
            {buttonConfigs.map((config, index) => (
              <FilterButtons
                key={index}
                category={config.category}
                options={config.options}
                activeCategory={activeFilterCategory}
                setActiveCategory={setActiveFilterCategory}
                resetKey={resetKey} // Pass the resetKey as a prop to trigger a reset
                aria-label={`Filter restaurant list by ${config.category}`}
              />
            ))}
            {/* Add the Reset button with styling */}
            <div className={styles.resetButtonContainer}>
              <button
                className={styles.resetButton}
                onClick={handleResetFilters}
                aria-label="Reset Filters"
              >
                Reset
              </button>
            </div>
          </div>

          <p className={styles.searchBarLine}></p>
        </div>
      )}

      {router.pathname === "/home" && (
        <div className={styles.restaurantBoxContainer}>
          <RestaurantList />
        </div>
      )}
    </div>
  );
};

export default Home;
