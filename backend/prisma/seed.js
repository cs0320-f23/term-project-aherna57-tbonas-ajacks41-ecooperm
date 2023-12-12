//@ts-nocheck
import { PrismaClient } from "@prisma/client";
import {
  categories,
  restaurantCategories,
  restaurants,
} from "../prisma/data.js";
const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.restaurant.deleteMany();
  await prisma.category.deleteMany();
  // Add more deleteMany calls for all your other models
}

clearDatabase().catch(console.error);

const load = async () => {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    console.log("Categories loaded");
    await prisma.restaurant.createMany({
      data: restaurants,
    });
    console.log("Restaurants loaded");

    for (let key in restaurantCategories) {
      let keyCategories = restaurantCategories[key];
      if (keyCategories === undefined) continue;
      for (let category of keyCategories) {
        const restaurantRecord = await prisma.restaurant.findFirst({
          where: { name: key },
        });
        const categoryRecord = await prisma.category.findFirst({
          where: { name: category },
        });
        if (restaurantRecord && categoryRecord) {
          await prisma.restaurantCategory.create({
            data: {
              restaurantId: restaurantRecord.id,
              categoryId: categoryRecord.id,
            },
          });
        }
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
