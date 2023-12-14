/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  //No longer gonna underscore escape opts because we actually want to use it.
  //^ Research further

  // This is a nextjs request from an API which you can actually pass to stuff
  // in clerk
  const { req } = opts;

  /*
  Since clerk is using JWTs, it is able to verify authentication on your server
  using the signature of the JWT, allowing them to skip a callback to their server
  just to verify that the user is authenticated. This lets us know for sure that 
  this is this user and gives us a little bit of info about them, specifically
  signedin signedout objects which tell us if they are signed in or out.
  */

  const sesh = getAuth(req);

  const userId = sesh.userId;

  return {
    prisma,
    userId,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * We won't always necessarily have auth but we can make a procedure that enforces
 * that we do. Easiest way to do that is to extend the public procedure with a new middleware.
 * It's not the same as a middleware in nextjs that runs on an edge function. It is
 * just a process that runs before the main request processing. Super helpful for things like
 * attaching auth and making sure users are actually authenticated.
 *
 * We attached auth earlier so we will simply verify here.
 */
const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
}); 

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);
