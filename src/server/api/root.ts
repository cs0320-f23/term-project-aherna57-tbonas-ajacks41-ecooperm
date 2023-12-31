import { createTRPCRouter } from "~/src/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { restaurantsRouter } from "./routers/restaurants";
import { reviewsRouter } from "./routers/reviews";
import { recsRouter } from "./routers/recommendations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  reviews: reviewsRouter,
  restaurants: restaurantsRouter,
  recommendations: recsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
