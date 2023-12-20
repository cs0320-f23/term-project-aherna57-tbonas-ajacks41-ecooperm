import { appRouter } from "~/src/server/api/root";
//import { createServerSideHelpers } from '@trpc/react-query/ssg';
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/src/server/db";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });
