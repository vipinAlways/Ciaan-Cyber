 // this should point to your `auth.ts` or `[...nextauth]/route.ts`
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";


export async function middleware(request: NextRequest) {
  const session = await auth();

  const isLoggedIn = !!session?.user;

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
    return redirect(("/auth/signin"));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/user"], // protect these routes
};
