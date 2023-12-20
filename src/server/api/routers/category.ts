import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/api/trpc";

export const categoryRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findUnique({
        where: { id: input.id },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });

      return category;
    }),
  getIdFromName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: { name: input.name },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });

      return category.id;
    }),
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: { name: input.name },
      });

      if (!category) throw new TRPCError({ code: "NOT_FOUND" });

      return category;
    }),
});
