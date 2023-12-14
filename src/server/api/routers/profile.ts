import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/src/server/api/trpc";
import { filterUserForClient } from "~/src/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  // getUserById: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ input }) => {
  //     const [user] = await clerkClient.users.getUserList({
  //       id: [input.id],
  //     });

  //     if (!user) {
  //       // if we hit here we need a unsantized username so hit api once more and find the user.
  //       const users = await clerkClient.users.getUserList({
  //         limit: 200,
  //       });
  //       const user = users.find((user) =>
  //         user.externalAccounts.find((account) => account.id === input.id)
  //       );
  //       if (!user) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "User not found",
  //         });
  //       }
  //       return filterUserForClient(user);
  //     }

  //     return filterUserForClient(user);
  //   }),

  getByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      return user;
    }),

  //Zod: Use to type-check data essentially
  create: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        picURL: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const user = await ctx.prisma.user.create({
        data: {
          // TODO: Flesh this out later
          // Provide the necessary data for creating a user
          // For example:
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          profilePictureURL: input.picURL,
          // Add other properties as needed
        },
      });
      return user;
    }),
});
