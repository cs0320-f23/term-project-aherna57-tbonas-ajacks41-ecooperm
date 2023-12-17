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

import { Review, Restaurant } from "@prisma/client";
import { filterUserForClient } from "../../helpers/filterUserForClient";
import { api } from "~/src/utils/api";
import { prisma } from "../../db";

const addUserDataToReviews = async (reviews: Review[]) => {
  const userId = reviews.map((review) => review.authorId);
  //We need more data, specifically, the user profile image url. We will use
  //the clerk client
  //We need more data, specifically, the user profile image url. We will use
  //the clerk client
  const users = (
    await clerkClient.users.getUserList({
      //userId: posts.map((post) => post.authorId),
      userId: userId,
      limit: 100,
    })
  ).map(filterUserForClient);

  return reviews.map((review) => {
    const author = users.find((user) => user.id == review.authorId);

    if (!author) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        // Post author id in errors
        message: `Author for review not found. REVIEW ID: ${review.id}, USER ID: ${review.authorId}`,
      });
    }
    if (!author.id) {
      //user the ExternalUsername
      if (!author.externalUsername) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Author has no authorized account: ${author.id}`,
        });
      }
      author.id = author.externalUsername;
    }
    return {
      review,
      author: {
        ...author,
        fullName: author.fullName ?? "(User name not found)",
      },
    };
  });
};

const addRestaurantDataToReviews = async (reviews: Review[]) => {
  const restaurantId = reviews.map((review) => review.restaurantId);

  const restaurants = await prisma.restaurant.findMany({
    take: 100,
    orderBy: [{ name: "asc" }],
    include: {
      RestaurantCategory: true,
    },
  });

  if (!restaurants) throw new TRPCError({ code: "NOT_FOUND" });

  return reviews.map((review) => {
    const restaurant = restaurants.find(
      (restaurant) => restaurant.id == review.restaurantId
    );

    if (!restaurant) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        // Post author id in errors
        message: `Restaurant for review not found. REVIEW ID: ${review.id}, RESTAURANT ID: ${review.authorId}`,
      });
    }

    if (!restaurant.id) {
      //user the ExternalUsername
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Restaurant has no registered account: ${restaurant.id}`,
      });
    }

    return {
      review,
      restaurant: {
        ...restaurant,
        name: restaurant.name ?? "( not found)",
      },
    };
  });
};

const addDataToReviews = async (reviews: Review[]) => {
  const userId = reviews.map((review) => review.authorId);
  const restaurantId = reviews.map((review) => review.restaurantId);


  const users = (
    await clerkClient.users.getUserList({
      //userId: posts.map((post) => post.authorId),
      userId: userId,
      limit: 100,
    })
  ).map(filterUserForClient);

  const restaurants = await prisma.restaurant.findMany({
    take: 100,
    orderBy: [{ name: "asc" }],
    include: {
      RestaurantCategory: true,
    },
  });

  console.log(restaurants, "restaurants");

  return reviews.map((review) => {
    const author = users.find((user) => user.id == review.authorId);
    let restaurant;

    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id == review.restaurantId) {
        console.log("restaurant found");
        restaurant = restaurants[i];
        console.log("restaurant: " + restaurant.id);
        break;
      }
    }

    console.log("restaurant undefined: " + restaurant);

    if (!author) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        // Post author id in errors
        message: `Author for review not found. REVIEW ID: ${review.id}, USER ID: ${review.authorId}`,
      });
    }

    if (!restaurant) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        // Post author id in errors
        message: `Restaurant for review not found. REVIEW ID: ${review.id}, RESTAURANT ID: ${review.restaurantId}`,
      });
    }

    if (!author.id) {
      //user the ExternalUsername
      if (!author.externalUsername) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Author has no authorized account: ${author.id}`,
        });
      }
      author.id = author.externalUsername;
    }

    if (!restaurant.id) {
      //user the ExternalUsername
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Restaurant has no registered account: ${restaurant.id}`,
      });
    }

    return {
      review,
      author: {
        ...author,
        fullName: author.fullName ?? "(User not found)",
      },
      restaurant: {
        ...restaurant,
        name: restaurant.name ?? "(Restaurant not found)",
      },
    };
  });
};

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const reviewsRouter = createTRPCRouter({
  /*
    Gets all the reviews for us. This does not need to be protected by user
    authetication because people should be able to see all reviews from the home
    page without logging in.
    */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const reviews = await ctx.prisma.review.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return addDataToReviews(reviews);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: { id: input.id },
      });

      if (!review) throw new TRPCError({ code: "NOT_FOUND" });

      return (await [review])[0];
    }),

  getReviewsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.review
        .findMany({
          where: {
            authorId: input.userId,
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        })
        .then(addUserDataToReviews)
        .then(then((item) => addDataToReviews))
    ),

  getReviewsByRestaurantId: publicProcedure
    .input(
      z.object({
        restaurantId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.review
        .findMany({
          where: {
            restaurantId: input.restaurantId,
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        })
        .then(addUserDataToReviews)
        .then((data) => addDataToReviews(data.map((item) => item.review)))
    ),

  getByRating: publicProcedure
    .input(z.object({ rating: z.number() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { rating: input.rating },
      });

      if (!reviews) throw new TRPCError({ code: "NOT_FOUND" });

      return addUserDataToReviews(reviews);
    }),

  getByKeyword: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { content: { contains: input.keyword } },
      });

      if (!reviews) throw new TRPCError({ code: "NOT_FOUND" });

      return reviews;
    }),

  //Guarantees user is authenticated

  //Zod: Use to type-check data essentially
  create: privateProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(3, {
            message: "Review must be three characters or longer.",
          })
          .max(500),
        restaurantId: z.string(),
        rating: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const review = await ctx.prisma.review.create({
        data: {
          //TODO: Flesh this out later
          authorId,
          content: input.content,
          restaurantId: input.restaurantId,
          title: input.content.substring(0, 50),
          rating: input.rating,
        },
      });
      return review;
    }),
});
