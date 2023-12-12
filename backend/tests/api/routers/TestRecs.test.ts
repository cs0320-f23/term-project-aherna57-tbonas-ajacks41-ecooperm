import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/api/root";
import assert from "assert";

const prisma = new PrismaClient();
test("add a new function to TestCommandToFunction", () => {
  console.log("hello world");
});

test("get boba shops from database", async () => {
  const bobaShops = await appRouter.restaurants.getAll({
    prisma: prisma,
    userId: null,
  });
});
