
import NextAuth from "next-auth";
import { cache } from "react";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

export const auth = cache(uncachedAuth);
export { signIn, signOut };
