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
<<<<<<< HEAD:backend/api/routers/restaurants.ts
      orderBy: [{ rating: "desc" }],
=======
      orderBy: [{ name: "asc" }],
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/api/routers/restaurants.ts
      include: {
        RestaurantCategory: true,
      },
    });
    

    return restaurants;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: input.id },
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
<<<<<<< HEAD:backend/api/routers/restaurants.ts
=======
        include: {
          RestaurantCategory: true,
        },
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/api/routers/restaurants.ts
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
<<<<<<< HEAD:backend/api/routers/restaurants.ts
=======
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),

  getNamesWith: publicProcedure
    .input(z.object({ letter: z.string().min(1).max(1) }))
    .query(async ({ ctx, input }) => {
      const restaurants = await ctx.prisma.restaurant.findMany({
        where: { name: { contains: input.letter } },
        include: {
          RestaurantCategory: true,
        },
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/api/routers/restaurants.ts
      });

      if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

      return restaurants;
    }),
});
