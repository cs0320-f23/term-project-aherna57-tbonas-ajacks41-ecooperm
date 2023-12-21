import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { overlap } from "~/src/server/utils/algorithms/overlap";
import { Restaurant } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { filterUserForClient } from "../../helpers/filterUserForClient";

export const recsRouter = createTRPCRouter({
  getRecsForUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const restaurants = await ctx.prisma.restaurant.findMany({
          take: 100,
          orderBy: [{ createdAt: "desc" }],
          include: {
            categories: true,
          },
        });

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
          filterUserForClient(user);
        }

        const recRestaurants: Restaurant[] = [];

        const reviews = await ctx.prisma.review.findMany({
          where: {
            authorId: input.userId,
          },
          include: {
            restaurant: {
              include: {
                categories: true,
              },
            },
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        });

        if (reviews.length === 0) {
          const backup = restaurants
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          console.log("checking over here", backup);
          return backup;
        } else {
          for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review) {
              const userRestaurant = review.restaurant;
              if (userRestaurant) {
                let calcOverlap;
                restaurants.map((restaurant: any) => {
                  if (restaurant.id !== userRestaurant.id) {
                    calcOverlap = overlap(
                      userRestaurant.categories,
                      restaurant.categories
                    );
                    if (calcOverlap >= 0.7) {
                      recRestaurants.push(userRestaurant);
                    }
                  }
                });
              }
            }
          }
        }

        console.log("checking over here", recRestaurants);
        return recRestaurants;
      } catch (error) {
        // Log the error and rethrow it as a TRPCError
        console.error("Error in getRecsForUser procedure:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),

  getTopRestaurants: publicProcedure.query(async ({ ctx }) => {
    const restaurants = await ctx.prisma.restaurant.findMany({
      take: 4,
      orderBy: [{ createdAt: "desc" }],
      include: {
        categories: true,
      },
    });
    return restaurants;
  }),

  getRandomRestaurants: publicProcedure.query(async ({ ctx }) => {
    let restaurants = await ctx.prisma.restaurant.findMany({
      include: {
        categories: true,
      },
    });
    for (let i = restaurants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restaurants[i], restaurants[j]] = [restaurants[j], restaurants[i]];
    }
    return restaurants.slice(0, 4);
  }),
});
