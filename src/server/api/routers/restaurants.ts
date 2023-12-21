import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/src/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

import { Restaurant } from "@prisma/client";



export const restaurantsRouter = createTRPCRouter({
  /*
    Gets all the restaurants for us. This does not need to be protected by user
    authetication because people should be able to see all restaurants from the home
    page without logging in.
    */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const restaurants = await ctx.prisma.restaurant.findMany({
      take: 100,
      orderBy: [{ name: "asc" }],
      include: {
        RestaurantCategory: {
          include: {
            category: true, 
          },
        },
        Review: true,
      },
    });

    return restaurants;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: input.id },
        include: {
          categories: true,
          RestaurantCategory: true,
        },
      });

      if (!restaurant) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurant;
    }),

  getByRatingExact: publicProcedure
    .input(z.object({ rating: z.number().min(1).max(5) }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: { rating: input.rating },
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),

  getByRatingLeast: publicProcedure
    .input(z.object({ rating: z.number().min(1).max(5) }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: { rating: { gte: input.rating } },
        include: {
          RestaurantCategory: true,
        },
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),

  getByPriceCategory: publicProcedure
    .input(z.object({ priceCategory: z.number().min(1).max(4) }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: { priceCategory: input.priceCategory },
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),

  getByCategory: publicProcedure
    .input(z.object({ categoryName: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: {
          RestaurantCategory: {
            some: {
              category: {
                name: input.categoryName,
              },
            },
          },
        },
        include: {
          RestaurantCategory: true,
        },
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),

  getRestaurantCategory: publicProcedure
    .input(z.object({ restaurantid: z.string() }))
    .query(async ({ ctx, input }) => {
      const categories = await ctx.prisma.category.findMany({
        where: {
          RestaurantCategory: {
            some: {
              restaurant: {
                id: input.restaurantid,
              },
            },
          },
        },
      });

      if (!categories) throw new TRPCError({ code: "NOT_FOUND" });

      return categories;
    }),

  getNamesWith: publicProcedure
    .input(z.object({ letter: z.string().min(1).max(1) }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: { name: { contains: input.letter } },
        include: {
          RestaurantCategory: true,
        },
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),
});
