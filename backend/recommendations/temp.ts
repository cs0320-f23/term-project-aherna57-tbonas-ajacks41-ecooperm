import { PrismaClient, Restaurant } from "@prisma/client";
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

async function findOverlap() {
    const restaurants = await getRestaurants();

    for (let i = 0; i < restaurants.length; i++) {
        const restaurantA = restaurants[i];

        for (let j = i + 1; j < restaurants.length; j++) {
            const restaurantB = restaurants[j];
            if (restaurantA && restaurantB) {

                const overlapCategories = overlap(
                    restaurantA.categories, 
                    restaurantB.categories
                );

                console.log(
                  `Overlap between ${restaurantA.name} and ${restaurantB.name}: ${overlapCategories}`
                );
            }
        }
    }
}

findOverlap();

