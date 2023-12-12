import { PrismaClient } from "@prisma/client";
import { categories, restaurants } from "../prisma/data.js";
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
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

load();
