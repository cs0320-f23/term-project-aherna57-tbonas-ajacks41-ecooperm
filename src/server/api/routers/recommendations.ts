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
          take: 200,
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
          //console.log("checking over here", backup);
          return backup;
        } else {
          //console.log("checking over here", reviews);
          for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review) {
              const userRestaurant = review.restaurant;
              if (userRestaurant) {
                //console.log("checking over here", userRestaurant);
                let calcOverlap;
                for (const restaurant of restaurants) {
                  console.log("checking over here (outside if):", restaurant);
                  if (restaurant.id !== userRestaurant.id) {
                    console.log("checking over here", restaurant.categories);
                    console.log("checking over here", userRestaurant.categories);
                    calcOverlap = overlap(
                      userRestaurant.categories,
                      restaurant.categories
                    );
                   //console.log("checking over here", calcOverlap);
                    if (calcOverlap >= 0.7) {
                      recRestaurants.push(restaurant);
                    }
                  }
                }
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

  getRecsForRestaurant: publicProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const currRestaurant = await ctx.prisma.restaurant.findUnique({
          where: {
            id: input.restaurantId,
          },
          include: {
            categories: true,
          },
        });

        if (!currRestaurant) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "User not found",
          });
        }

        const restaurants = await ctx.prisma.restaurant.findMany({
          take: 200,
          orderBy: [{ createdAt: "desc" }],
          include: {
            categories: true,
          },
        });

        let recRestaurants: Restaurant[] = [];

        let calcOverlap;
        restaurants.map((restaurant: any) => {
          if (currRestaurant.id !== restaurant.id) {
            calcOverlap = overlap(
              currRestaurant.categories,
              restaurant.categories
            );
            if (calcOverlap >= 0.8) {
              recRestaurants.push(restaurant);
            }
          }
        });

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
