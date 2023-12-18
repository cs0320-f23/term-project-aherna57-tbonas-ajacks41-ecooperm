import React, { useState, useEffect } from "react";
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

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import type { User } from "@clerk/nextjs/dist/types/api";
import Image from "next/image";

interface FeedProps {
  selectedOption: string | null;
}
const Feed = (props: FeedProps) => {
  let selectedOption: string | null = props.selectedOption;
  // Get all restaurants from the API
  const { data, isLoading: restaurantsLoading } = !selectedOption
    ? api.restaurants.getAll.useQuery()
    : api.restaurants.getByCategory.useQuery({
        categoryName: selectedOption,
      });
  // If the data is loading, render a loading message
  if (restaurantsLoading) return <div>Loading...</div>;
  console.log(props.selectedOption, data);

  if (!data) return <div>Something went wrong...</div>;

  return (
    /*Keys are a way that react uses to identify what should or shouldn't 
      be updated. Keep amount of time to render down slightly */

    <div className={styles.restaurantBoxContainer}>
      {data.map((fullRestaurant) => (
        <RestaurantList {...fullRestaurant} key={fullRestaurant.id} />
      ))}
    </div>
  );
};

const Home = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  let userId = user?.id;

  const [result, setResult] = useState<any[]>([]);

  const [activeFilterCategory, setActiveFilterCategory] = useState<
    string | null
  >(null);

  const [resetKey, setResetKey] = useState<number>(0); // Add a state to trigger a reset
  console.log("activeFilterCategory", activeFilterCategory);
  console.log("selectedOption", selectedOption);
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

  // Function to handle user logout
  function handleLogout() {
    Cookies.remove("user");
    router.push("/");
  }

  // const handleUserImageClick = () => {
  //   // Navigate to the user profile page
  //   router.push(`/users/${user.id}`);
  // };

  const handleHomeClick = () => {
    // Navigate to the home page
    router.push("/home");
  };

  //Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <div>
      {!isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}

      {isSignedIn && (
        <div>
          <h1 className={styles.header}>
            <div
              className={styles.title}
              onClick={handleHomeClick}
              aria-label="Navigate to Home Page"
            >
              Bear{" "}
              <img className={styles.iconTop} src="/logo.png" alt="Logo"></img>{" "}
              Bites
            </div>
            <div className={styles.userIm}>
              <Link href={`/users/${userId}`}>
                <Image
                  src={user.imageUrl}
                  alt={`@${user.firstName}'s profile picture`}
                  className="h-14 w-14 rounded-full"
                  width={56}
                  height={56}
                />
              </Link>
              <div className={styles.dropdownMenu}>
                <SignOutButton />
              </div>
            </div>
          </h1>

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
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
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

          <div className={styles.restaurantBoxContainer}>
            <Feed selectedOption={selectedOption} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
