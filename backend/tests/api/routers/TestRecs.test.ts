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
  const restaurants = await appRouter.restaurants.getAll({
    ctx: {
      prisma: prisma,
      userId: null,
    },
    rawInput: undefined,
    path: "",
    type: "query",
  });
  assert(Array.isArray(restaurants), "restaurants is not an array");
  assert(restaurants.length > 0, "restaurants is not empty");
});
