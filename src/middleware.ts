import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
