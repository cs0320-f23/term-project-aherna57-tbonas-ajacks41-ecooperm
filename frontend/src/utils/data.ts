export const userQuery = (userId : any) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};


export const buttonConfigs = [
  {
    category: "Price",
    options: ["Low to High", "High to Low"],
  },
  {
    category: "Dietary Restrictions",
    options: ["None","Gluten Free", "Vegetarian", "Vegan", "Kosher", "Halal"],
  },
  {
    category: "Cuisine",
    options: [
      "All",
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
