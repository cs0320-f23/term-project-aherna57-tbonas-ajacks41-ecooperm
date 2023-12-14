import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { overlap } from "~/src/server/utils/algorithms/overlap";
import { Restaurant } from "@prisma/client";

export const recsRouter = createTRPCRouter({
  getRecsForUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
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

      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      const recRestaurants: Restaurant[] = [];

      for (let i = 0; i < user.reviews.length; i++) {
        const review = user.reviews[i];
        if (review) {
          const userRestaurant = review.restaurant;
          if (userRestaurant) {
            let calcOverlap;
            restaurants.map((restaurant) => {
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

      return recRestaurants;
    }),
});
