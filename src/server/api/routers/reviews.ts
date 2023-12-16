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

import { Review } from "@prisma/client";
//import { filterUserForClient } from "~/src/server/helpers";


// const addUserDataToReviewss = async (reviews: Review[]) => {
//   const userId = reviews.map((review) => review.userId);

//   //We need more data, specifically, the user profile image url. We will use
//   //the clerk client
//   const users = [].map(filterUserForClient);

//   return reviews.map((review) => {
//     const author = users.find((user) => user.id == review.userId);

//     if (!author) {
//       throw new TRPCError({
//         code: "INTERNAL_SERVER_ERROR",
//         // Post author id in errors
//         message: `Author for review not found. POST ID: ${review.id}, USER ID: ${review.userId}`,
//       });
//     }
//     if (!author.username) {
//       //user the ExternalUsername
//       if (!author.externalUsername) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: `Author has no authorized account: ${author.id}`,
//         });
//       }
//       author.username = author.externalUsername;
//     }
//     return {
//       review,
//       author: {
//         ...author,
//         username: author.username ?? "(username not found)",
//       },
//     };
//   });
// };


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

    return reviews;
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

  getByRating: publicProcedure
    .input(z.object({ rating: z.number() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { rating: input.rating },
      });

      if (!reviews) throw new TRPCError({ code: "NOT_FOUND" });

      return reviews;
    }),

  getByKeyword: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { description: { contains: input.keyword } },
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const { success } = await ratelimit.limit(userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const review = await ctx.prisma.review.create({
        data: {
          //TODO: Flesh this out later
          userId,
          description: input.content,
          restaurantId: "",
          title: "",
          rating: 0,
        },
      });
      return review;
    }),
});
