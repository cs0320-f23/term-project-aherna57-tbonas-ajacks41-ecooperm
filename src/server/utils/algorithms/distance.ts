//  The Manhattan distance between their Cartesian coordinates: that is, the “distance” between two points (ax,ay)
//  and (bx,by)
//  is the sum of the absolute differences of their Cartesian coordinates:

import { Restaurant } from "@prisma/client";

// dist(a,b)=|ax−bx|+|ay−by|

export function distance (res1: Restaurant, res2: Restaurant) {
   return Math.abs(res1.longitude - res2.longitude) + Math.abs(res1.latitude - res2.latitude);
}

