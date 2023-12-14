import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";


//https://medium.com/@zachshallbetter/middleware-in-next-js-a-comprehensive-guide-7dd0a928541a

// Using Next.js 
export function middleware(request: NextRequest) {
  if (!request.cookies?.has('authenticated=true')) {
    
    //cookie?.includes('authenticated=true')) {
    // Redirect to the login page
    return NextResponse.rewrite('https://localhost:3000/');
  }
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
