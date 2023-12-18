import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { overlap } from "~/src/server/utils/algorithms/overlap";
import { Restaurant } from "@prisma/client";

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

        const user = await ctx.prisma.user.findUnique({
          where: { id: input.userId },
          include: {
            reviews: {
              where: {
                rating: { gte: 4 },
              },
              include: {
                restaurant: {
                  include: {
                    categories: true,
                  },
                },
              },
            },
          },
        });

        if (!user) {
          // If user not found, return 4 random restaurants
          const backup = restaurants
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          console.log("checking over here", backup);
          return backup;
        }

        const recRestaurants: Restaurant[] = [];

        for (let i = 0; i < user.reviews.length; i++) {
          const review = user.reviews[i];
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
});
