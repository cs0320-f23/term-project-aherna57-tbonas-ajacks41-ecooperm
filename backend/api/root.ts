import { createTRPCRouter } from "~/api/trpc";
import { profileRouter } from "./routers/profiles";
import { restaurantsRouter } from "./routers/restaurants";
import { reviewsRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    profile: profileRouter,
    reviews: reviewsRouter,
    restaurants: restaurantsRouter,
});


// export type definition of API
export type AppRouter = typeof appRouter;
