//@ts-nocheck
import { PrismaClient, Restaurant } from "@prisma/client";
import { appRouter } from "~/api/root";
import assert, { AssertionError } from "assert";

let prisma: PrismaClient;

beforeEach(() => {
  prisma = new PrismaClient();
});

afterEach(async () => {
  await prisma.$disconnect();
});

test("add a new function to TestCommandToFunction", () => {
  console.log("hello world");
});

test("get mexican restaurants from database", async () => {
  console.log("got to here");
  const restaurants = await appRouter.restaurants.getByCategory({
    ctx: {
      prisma: prisma,
      userId: null,
    },
    rawInput: { categoryName: "Mexican" },
    path: "",
    type: "query",
  });
  const category = await appRouter.category.getByName({
    ctx: {
      prisma: prisma,
      userId: null,
    },
    rawInput: { name: "Mexican" },
    path: "",
    type: "query",
  });
  for (const restaurant of restaurants) {
    assert.equal(
      restaurant.RestaurantCategory.some((rc) => rc.categoryId === category.id),
      true
    );
  }
});
