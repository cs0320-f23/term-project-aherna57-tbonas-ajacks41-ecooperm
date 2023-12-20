import React, { useState } from "react";
import axios from "axios";
import Result from "../container/Result";
import Searchbar from "../container/SearchBar";
import { ResultProps } from "../container/Result";
import RestaurantList from "../components/RestaurantList";
import styles from "../styles/home.module.css";
import { useRouter } from "next/router";
import { api } from "~/src/utils/api";
import Cookies from "js-cookie";
import FilterButtons from "../components/FilterButtons";
import { buttonConfigs } from "../utils/data";
import {
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import MyHome from "../container/myhome";

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

  if (!data) return <div>Something went wrong...</div>;

  return (
    /*Keys are a way that react uses to identify what should or shouldn't 
      be updated. Keep amount of time to render down slightly */

    <div className={styles.restaurantBoxContainer}>
      {data.map((fullRestaurant : any) => (
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

  //Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  if (user) {
    Cookies.set("user", JSON.stringify(user));
  }


  return (
    <div>
      {!isSignedIn && (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      )}

      {isSignedIn && (
        <div>
          <MyHome user={user} />
          
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
                  //selectedOption={selectedOption}
                  //setSelectedOption={setSelectedOption}
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
