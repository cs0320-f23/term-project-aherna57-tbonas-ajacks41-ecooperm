import { PrismaClient } from "@prisma/client";
import { appRouter } from "~/api/root";
import assert from "assert";

import {filterUserForClient } from "~/helpers/filterUserForClient";

const prisma = new PrismaClient();
test("add a new function to TestCommandToFunction", () => {
  console.log("hello world");
});

test("test filterUserForClient", async () => {
  const user = await prisma.user.findUnique({
    where: { id: "ckuqk4r9k0000j1t6wq5y2x3w" },
  });
  const filteredUser = filterUserForClient(user);
  assert(filteredUser);
  assert(filteredUser.id === "ckuqk4r9k0000j1t6wq5y2x3w");
  assert(filteredUser.email === "
});
