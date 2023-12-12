//@ts-nocheck
import { PrismaClient, Restaurant } from "@prisma/client";
import { appRouter } from "~/api/root";
import assert from "assert";

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

test("get boba shops from database", async () => {
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
  console.log(restaurants);
});
