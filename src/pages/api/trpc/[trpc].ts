import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/src/env.mjs";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { TRPCError } from "@trpc/server";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }: { path: string | undefined; error: TRPCError }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
