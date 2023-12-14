/**The file exports a mock data array named restaurants, which contains information about two restaurants, 
 * including their names, phone numbers, menus, images, cuisine types, dollar signs, stars, reviews, addresses, 
 * and background images. This data is intended for testing and development purposes, 
 * mimicking the structure of a restaurant dataset in a real-world application. */

// Mock data for a list of restaurants
const restaurants = [
  {
    id: 1,
    name: "Baja's Taqueria",
    phone: "(401) 808-6141",
    menu: "https://bajasrestaurants.com/rhode-island-wakefield-ri-cranston-ri-baja-s-food-menu",
    imageUrl: "baja.jpg",
    cuisineType: "Mexican",
    dollarSigns: 1,
    stars: 2,
    reviews: 10,
    address: "123 Main St, Cityville",
    background:
      "https://d1ralsognjng37.cloudfront.net/c79a841c-8785-4851-96cc-1f28b059df4c",
  },
  {
    id: 2,
    name: "Amy's",
    phone: "(401) 274-9966",
    menu: "https://amysplaceri.com/#menu_section",
    imageUrl: "amy.jpg",
    cuisineType: "Diner",
    dollarSigns: 2,
    stars: 5,
    reviews: 6,
    address: "456 Second St, Townsville",
    background:
      "https://www.visitbuffaloniagara.com/businesses/amys-place/256955_2165221887739_1162397020_32727656_5494840_o_8d4b32f7-5056-a348-3ad6f7017b4ae484-2/",
  },
];

// Exporting the mock data for restaurants
export { restaurants };
