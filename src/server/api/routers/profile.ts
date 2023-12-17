import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/src/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";
import { filterUserForClient } from "../../helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserList: publicProcedure.query(async () => {
    const users = await clerkClient.users.getUserList({
      limit: 200,
    });

    return users.map(filterUserForClient);
  }),

  getUserById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        userId: [input.userId],
      });

      if (!user) {
        // if we hit here we need a unsantized username so hit api once more and find the user.
        const users = await clerkClient.users.getUserList({
          limit: 200,
        });
        const user = users.find((user) =>
          user.externalAccounts.find((account) => account.id === input.userId)
        );
        if (!user) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "User not found",
          });
        }
        return filterUserForClient(user);
      }

      return filterUserForClient(user);
    }),
});
