import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { overlap } from "~/recommendations/algorithms/overlap";
import { Restaurant } from "@prisma/client";

export const recsRouter = createTRPCRouter({
  // getBestRec: publicProcedure.query(async ({ ctx }) => {
  //   // throw NotFoundError if user is not logged in
  //   if (ctx.userId === null) {
  //     throw new TRPCError({ code: "NOT_FOUND" });
  //   }
  //   const recentReviews = await ctx.prisma.review.findMany({
  //     take: 100,
  //     orderBy: [{ createdAt: "desc" }],
  //     where: {
  //       userId: {
  //         not: ctx.userId,
  //       },
  //     },
  //   });
  //   let restaurantIdToIndex = new Map<string, number>();
  //   let userIdToIndex = new Map<string, number>();
  //   let userIdToRestaurantIdToRating = new Map<string, Map<string, number>>();
  //   let restaurantCount = 0;
  //   let userCount = 0;
  //   for (let i = 0; i < recentReviews.length; i++) {
  //     const review = recentReviews[i];
  //     if (review === undefined || review.userId === null) {
  //       continue;
  //     } else if (restaurantIdToIndex.has(review.restaurantId)) {
  //       continue;
  //     } else {
  //       restaurantIdToIndex.set(review.id, restaurantCount);
  //       restaurantCount++;
  //     }
  //     if (userIdToIndex.has(review.userId)) {
  //       continue;
  //     } else {
  //       userIdToIndex.set(review.userId, userCount);
  //       userCount++;
  //     }
  //     if (userIdToRestaurantIdToRating.has(review.userId)) {
  //       userIdToRestaurantIdToRating
  //         .get(review.userId)
  //         ?.set(review.restaurantId, review.rating);
  //     } else {
  //       userIdToRestaurantIdToRating.set(
  //         review.userId,
  //         new Map([[review.restaurantId, review.rating]])
  //       );
  //     }
  //   }
  //   // initialize ratings array to pass into recommender library
  //   let ratingsArray: number[][] = new Array(restaurantIdToIndex.size)
  //     .fill(0)
  //     .map(() => new Array(userIdToIndex.size).fill(0));
  //   recentReviews.forEach((review) => {
  //     if (review === undefined || review.userId === null) {
  //       return;
  //     }
  //     let userIndex = userIdToIndex.get(review.userId);
  //     let restaurantIndex = restaurantIdToIndex.get(review.restaurantId);
  //     if (userIndex !== undefined && restaurantIndex !== undefined) {
  //       if (ratingsArray.length >= restaurantIndex) {
  //         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //       }
  //       ratingsArray[restaurantIndex]![userIndex] = review.rating;
  //     } else {
  //       throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //     }
  //   });
  //   return ratingsArray;
  // }),

  getRecsForUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
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
