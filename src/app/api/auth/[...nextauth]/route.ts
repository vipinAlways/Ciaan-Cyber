
import NextAuth from "next-auth";
import { authConfig } from "./config";

const { handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
