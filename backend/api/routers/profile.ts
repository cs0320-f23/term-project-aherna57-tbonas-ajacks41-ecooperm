import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/api/trpc";
import { filterUserForClient } from "~/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        id: [input.id],
      });

      if (!user) {
        // if we hit here we need a unsantized username so hit api once more and find the user.
        const users = await clerkClient.users.getUserList({
          limit: 200,
        });
        const user = users.find((user) =>
          user.externalAccounts.find((account) => account.id === input.id)
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
