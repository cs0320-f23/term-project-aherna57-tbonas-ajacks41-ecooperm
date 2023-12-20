import { createTRPCRouter } from "~/src/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { restaurantsRouter } from "./routers/restaurants";
import { reviewsRouter } from "./routers/reviews";
<<<<<<< HEAD:backend/api/root.ts
import { categoryRouter } from "./routers/category";
=======
import { recsRouter } from "./routers/recommendations";
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/api/root.ts

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  reviews: reviewsRouter,
  restaurants: restaurantsRouter,
<<<<<<< HEAD:backend/api/root.ts
  category: categoryRouter,
=======
  recommendations: recsRouter,
>>>>>>> 9652e22eb720c1a7d37553064613ae9359524aa6:src/server/api/root.ts
});

// export type definition of API
export type AppRouter = typeof appRouter;
