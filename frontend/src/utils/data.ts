/**The file exports a function named userQuery that generates a query for fetching user data based on the provided userId. 
 * Additionally, the file exports an array named buttonConfigs, which holds configurations for filter buttons on the home page. 
 * These configurations include categories like "Price," "Dietary Restrictions," "Cuisine," and "Ratings," each with corresponding 
 * options for filtering. The purpose is to provide a structured set of options for users to filter and sort restaurant data on the home page. */

// Function to generate a user query based on the provided userId
export const userQuery = (userId: any) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

// Configuration for filter buttons on the home page
export const buttonConfigs = [
  {
    category: "Price",
    options: ["Low to High", "High to Low"],
  },
  {
    category: "Dietary Restrictions",
    options: ["None", "Gluten Free", "Vegetarian", "Vegan", "Kosher", "Halal"],
  },
  {
    category: "Cuisine",
    options: [
      "All",
      "American",
      "Seafood",
      "Grill",
      "Coffee",
      "Italian",
      "Japanese",
      "Asian",
      "Healthy",
      "Lebanese",
      "Chinese",
      "Fast Food",
      "Dessert",
      "Breakfast",
      "Sushi",
      "Sandwiches",
      "Mexican",
      "Indian",
      "Ramen",
      "Burgers",
    ],
  },
  {
    category: "Ratings",
    options: ["High to low", "Low to high", "5 star only"],
  },
];
