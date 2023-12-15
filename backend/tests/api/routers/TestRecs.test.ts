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
