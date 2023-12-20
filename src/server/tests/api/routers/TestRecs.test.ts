<<<<<<< HEAD:backend/tests/api/routers/TestRecs.test.ts
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

=======
import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/src/server/api/root";
import assert from "assert";


const prisma = new PrismaClient();
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/tests/api/routers/TestRecs.test.ts
test("add a new function to TestCommandToFunction", () => {
  console.log("hello world");
});

<<<<<<< HEAD:backend/tests/api/routers/TestRecs.test.ts
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
=======
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/tests/api/routers/TestRecs.test.ts
