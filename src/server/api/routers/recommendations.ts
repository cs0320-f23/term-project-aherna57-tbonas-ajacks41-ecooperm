import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { overlap } from "~/src/server/utils/algorithms/overlap";
import { distance } from "../../utils/algorithms/distance";
import { Restaurant } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { filterUserForClient } from "../../helpers/filterUserForClient";
import { startTransition } from "react";

/**
 * Retrieves recommendations for users and restaurants.
 */
export const recsRouter = createTRPCRouter({
  getRecsForUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const restaurants = await ctx.prisma.restaurant.findMany({
          take: 200,
          orderBy: [{ createdAt: "desc" }],
          include: {
            categories: true,
          },
        });

        const [user] = await clerkClient.users.getUserList({
          userId: [input.userId],
        });

        if (!user) {
          // if we hit here we need a unsantized username so hit api once more and find the user.
          const users = await clerkClient.users.getUserList({
            limit: 200,
          });
          const user = users.find((user) =>
            user.externalAccounts.find((account) => account.id === input.userId)
          );

          if (!user) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "User not found",
            });
          }
          filterUserForClient(user);
        }

        const recRestaurants: Restaurant[] = [];

        const reviews = await ctx.prisma.review.findMany({
          where: {
            authorId: input.userId,
          },
          include: {
            restaurant: {
              include: {
                categories: true,
              },
            },
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        });

        if (reviews.length === 0) {
          const backup = restaurants
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          //console.log("checking over here", backup);
          return backup;
        } else {
          //console.log("checking over here", reviews);
          for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];
            if (review) {
              const userRestaurant = review.restaurant;
              // After fetching the data
              console.log("Fetched userRestaurant data:", userRestaurant);

              if (userRestaurant) {
                const userResCategories = await ctx.prisma.category.findMany({
                  where: {
                    RestaurantCategory: {
                      some: {
                        restaurant: {
                          name: userRestaurant.name,
                        },
                      },
                    },
                  },
                });
                // After fetching the data
                console.log(
                  "Fetched userRestaurantCat data:",
                  userResCategories
                );
                if (userResCategories.length === 0) {
                  continue;
                } else {
                  let calcOverlap;

                  for (const restaurant of restaurants) {
                    const resCategories = await ctx.prisma.category.findMany({
                      where: {
                        RestaurantCategory: {
                          some: {
                            restaurant: {
                              name: restaurant.name,
                            },
                          },
                        },
                      },
                    });
                    //console.log("checking over here (outside if):", restaurant);
                    if (restaurant.id !== userRestaurant.id) {
                      // Before using the data
                      console.log(
                        "UserRestaurant categories:",
                        userResCategories
                      );
                      calcOverlap = overlap(userResCategories, resCategories);
                      if (calcOverlap >= 0.7) {
                        recRestaurants.push(restaurant);
                      }
                    }
                  }
                }
              }
            }
          }
        }

        console.log("checking over here", recRestaurants);
        return recRestaurants;
      } catch (error) {
        // Log the error and rethrow it as a TRPCError
        console.error("Error in getRecsForUser procedure:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),

  getRecsForRestaurant: publicProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const currRestaurant = await ctx.prisma.restaurant.findUnique({
          where: {
            id: input.restaurantId,
          },
          include: {
            categories: true,
          },
        });

        if (!currRestaurant) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "User not found",
          });
        }

        const restaurants = await ctx.prisma.restaurant.findMany({
          take: 200,
          orderBy: [{ createdAt: "desc" }],
          include: {
            categories: true,
          },
        });

        let recRestaurants: Restaurant[] = [];

        let calcOverlap;
        restaurants.map((restaurant: any) => {
          if (currRestaurant.id !== restaurant.id) {
            calcOverlap = overlap(
              currRestaurant.categories,
              restaurant.categories
            );
            if (calcOverlap >= 0.8) {
              recRestaurants.push(restaurant);
            }
          }
        });

        console.log("checking over here", recRestaurants);
        return recRestaurants;
      } catch (error) {
        // Log the error and rethrow it as a TRPCError
        console.error("Error in getRecsForUser procedure:", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
      }
    }),

  getTopRestaurants: publicProcedure.query(async ({ ctx }) => {
    const restaurants = await ctx.prisma.restaurant.findMany({
      take: 4,
      orderBy: [{ createdAt: "desc" }],
      include: {
        categories: true,
      },
    });
    return restaurants;
  }),

  getRandomRestaurants: publicProcedure.query(async ({ ctx }) => {
    let restaurants = await ctx.prisma.restaurant.findMany({
      include: {
        categories: true,
      },
    });
    for (let i = restaurants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [restaurants[i], restaurants[j]] = [restaurants[j], restaurants[i]];
    }
    return restaurants.slice(0, 4);
  }),

  getFoodCrawl: publicProcedure.query(async ({ ctx }) => {
    let restaurants = await ctx.prisma.restaurant.findMany({
      include: {
        categories: true,
      },
    });

    if (!restaurants) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No restaurants found",
      });
    }

    let start = restaurants[Math.floor(Math.random() * restaurants.length)];
    let crawl = [start];

    let itemIndex = restaurants.indexOf(start);
    let newArray = restaurants.filter((e, i) => i !== itemIndex);

    for (const restaurant of newArray) {
      if (crawl.length === 4) {
        break;
      }

      let prevRes = crawl[crawl.length - 1];
      //console.log("checking over here", prevRes);
      let distancee = distance(prevRes, restaurant);
      //console.log("checking over here", distancee);
      let bound = Math.random() * (0.01 - 0.002) + 0.002;
      console.log("checking over here", bound);
      if (distancee < bound) {
        crawl.push(restaurant);
        itemIndex = newArray.indexOf(restaurant);
        newArray = newArray.filter((e, i) => i !== itemIndex);
      }
    }

    console.log("checking over here", crawl);
    return crawl;
  }),
});
