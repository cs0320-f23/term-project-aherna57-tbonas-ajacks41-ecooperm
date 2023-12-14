//@ts-nocheck
import { PrismaClient } from "@prisma/client";
import {
  categories,
  restaurantCategories,
  restaurants,
} from "../prisma/data.js";
const prisma = new PrismaClient();

const load = async () => {
  await prisma.restaurantCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
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
          console.log(restaurantRecord.id, categoryRecord.id);
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
    console.log("Error loading seed data");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
