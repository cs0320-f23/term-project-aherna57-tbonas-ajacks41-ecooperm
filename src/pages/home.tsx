import React, { createContext, useContext, useEffect, useState } from "react";
import Result from "../container/Result";
import Searchbar from "../container/SearchBar";
import { ResultProps } from "../container/Result";
import RestaurantList from "../components/RestaurantList";
import styles from "../styles/home.module.css";
import { api } from "~/src/utils/api";
import Cookies from "js-cookie";
import FilterButtons from "../components/FilterButtons";
import { buttonConfigs } from "../utils/data";
import { SignInButton, useUser } from "@clerk/nextjs";
import MyHome from "../container/myhome";
import { FilterContext } from "../components/FilterProvider";
import router from "next/router";

interface FeedProps {
  selectedOption: any;
}
const Feed = () => {
  const { selectedOptions } = useContext(FilterContext);
  console.log("op", selectedOptions);

  let selectedOption: any = selectedOptions;
  const keys =
    selectedOption && typeof selectedOption === "object"
      ? Object.keys(selectedOption)
      : [];

  const hasCuisine = keys.includes("Cuisine");
  const hasDR = keys.includes("Dietary Restrictions");
  const hasSort = keys.includes("Price");
  const hasRating = keys.includes("Ratings");
  const selectedRating = hasRating ? selectedOption["Ratings"] : null;
  const selectedSort = hasSort ? selectedOption["Price"] : null;
  const selectedCuisine = hasCuisine ? selectedOption["Cuisine"] : null;
  const selectedDR = hasDR ? selectedOption["Dietary Restrictions"] : null;
  const { data, isLoading } = api.restaurants.getAll.useQuery();

  let filteredData: any = data;

  if (data && Array.isArray(data)) {
    filteredData = data.filter((restaurant) => {
      const categoryNames = restaurant.RestaurantCategory.map(
        (category) => category.category.name
      );
      const matchesCuisine = selectedCuisine
        ? categoryNames.includes(selectedCuisine)
        : true;
      const matchesDR = selectedDR ? categoryNames.includes(selectedDR) : true;
      return matchesCuisine && matchesDR;
    });
  }
  if (selectedSort === "High to Low") {
    console.log("Orncnkcjes", "High To Low");
    filteredData = filteredData.sort(
      (a: any, b: any) => b.priceCategory - a.priceCategory
    );
  } else if (selectedSort === "Low to High") {
    console.log("Orncnkcjes", " Low");
    filteredData = filteredData.sort(
      (a: { priceCategory: number }, b: { priceCategory: number }) =>
        a.priceCategory - b.priceCategory
    );
  }

  const averageRating = (restaurant: any) => {
    if (restaurant.Review && restaurant.Review.length > 0) {
      const totalRating = restaurant.Review.reduce(
        (total: any, review: any) => total + review.rating,
        0
      );
      return totalRating / restaurant.Review.length; // Return the average, not the ceiling of it.
    }
    return 5; // Return 0 if there are no reviews.
  };

  if (selectedRating === "High to low") {
    console.log("Sorting", "High To Low");
    filteredData.sort((a: any, b: any) => averageRating(b) - averageRating(a));
  } else if (selectedRating === "Low to high") {
    console.log("Sorting", "Low to High");
    filteredData.sort((a: any, b: any) => averageRating(a) - averageRating(b));
  } else if (selectedRating === "5 Star Only") {
    console.log("Filtering", "5 star only");
    filteredData = filteredData.filter(
      (restaurant: any) => averageRating(restaurant) >= 4.5
    );
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    /*Keys are a way that react uses to identify what should or shouldn't 
      be updated. Keep amount of time to render down slightly */

    <div className={styles.restaurantBoxContainer}>
      {Array.isArray(data)
        ? filteredData.map((fullRestaurant: any) => (
            <RestaurantList {...fullRestaurant} key={fullRestaurant.id} />
          ))
        : filteredData.data?.map((fullRestaurant: any) => (
            <RestaurantList {...fullRestaurant} key={fullRestaurant.id} />
          ))}
    </div>
  );
};

const Home = () => {
  const { setSelectedOptions } = useContext(FilterContext);
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const [result, setResult] = useState<any[]>([]);
  const [activeFilterCategory, setActiveFilterCategory] = useState<
    string | null
  >(null);

  const { data } = api.restaurants.getAll.useQuery();
  const names = data?.map((item) => item.name);

  const [resetKey, setResetKey] = useState<number>(0); // Add a state to trigger a reset

  const handleResetFilters = () => {
    // Reset all filters
    setSelectedOptions({});
    setActiveFilterCategory(null);
    // Trigger a reset by updating the resetKey
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleFoodCrawl = () => {
    router.push("/foodcrawl");
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
          <div>
            <MyHome />
            <div>
              {/* Search Bar */}
              <div className={styles.searchBarContainer}>
                <Searchbar
                  fetchData={(value) =>
                    names.filter((name) =>
                      name.toLowerCase().includes(value.toLowerCase())
                    )
                  }
                  setResult={setResult}
                  aria-label="Search Bar"
                  restaurants={data}
                />
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

            <p className={styles.searchBarLine}></p>
          </div>

          {/* Foodcrawlbutton */}
          <div className={styles.foodCrawl}>
            <button onClick={handleFoodCrawl}>
              Click here to get a personalised foodcrawl map!
            </button>
          </div>

          <div className={styles.restaurantBoxContainer}>
            <Feed />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
