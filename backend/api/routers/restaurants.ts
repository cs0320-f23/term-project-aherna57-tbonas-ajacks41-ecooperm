import { clerkClient } from "@clerk/nextjs";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/api/trpc";
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
        orderBy: [{createdAt: "desc"}],
    });

    return restaurants;

  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async({ ctx, input }) => {
        const restaurant = await ctx.prisma.restaurant.findUnique({
            where: {id: input.id},
        });

        if (!restaurant) throw new TRPCError({code: "NOT_FOUND"});

        return (await [restaurant])[0]; 
  }),




    
  //Guarantees user is authenticated

  //Zod: Use to type-check data essentially
//   create: privateProcedure.input(
//     z.object({
//         content: z.string().min(1, { 
//             message: "Restaurant must be a character or longer." 
//         }).max(500),
//     })).mutation(async({ctx, input}) => {
//     const authorId = ctx.userId;

    
//     const {success} = await ratelimit.limit(authorId);
//     if(!success) throw new TRPCError({code: "TOO_MANY_REQUESTS"});

//     const restaurant = await ctx.prisma.restaurant.create({
//         data: {
//             authorId,
//             content: input.content,
//         },
//     });
//     return restaurant;
//   }),
});
