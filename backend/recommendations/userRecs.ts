import { PrismaClient, Restaurant, Category } from "@prisma/client";
import { overlap } from "./algorithms/overlap";

const prisma = new PrismaClient();

async function getRestaurants() {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      categories: true,
    },
  });

  return restaurants;
}

async function getUsers() {
    const users = await prisma.user.findMany({
      include: {
        reviews: {
          where: {
            rating: { gte: 4 },
          },
          include: {
            restaurant: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });
    return users;
}

async function userRecs() : Promise<Restaurant[]> {
  const recRestaurants: Restaurant[] = [];

  const restaurants = await getRestaurants();
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user) {
      for (let j = 0; j < user.reviews.length; j++) {
        const review = user.reviews[j];
        if (review) {
          const userRestaurant = review.restaurant;
          if (userRestaurant) {
            let calcOverlap;
            restaurants.map((restaurant) => { 
                if (restaurant.id !== userRestaurant.id) {
                    calcOverlap = overlap(
                        userRestaurant.categories, 
                        restaurant.categories);
                    if (calcOverlap >= 0.7) {
                        recRestaurants.push(userRestaurant);
                    }
                }
            });
          }
        }
      }
    }
  }

  return recRestaurants;
}
