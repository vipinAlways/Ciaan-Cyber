import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import { clearVerificationTokens } from "./clearVerification";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        if (credentials === null) return null;

        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email as string,
            },
          });
          if (!user)
            NextResponse.json({ message: "user not found" }, { status: 404 });

          const hash = await bcrypt.hash("password123", 10);
          const isValid = await bcrypt.compare("password123", hash);

          if (!isValid) throw new Error("Check Creedentials");

          return user;
        } catch (error) {
          console.log("error", error);
          throw new Error("server Error");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await clearVerificationTokens();
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },

    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { email: user.email ?? "" },
        });

        if (existingUser) {
          // Check if account already linked
          const existingAccount = await db.account.findFirst({
            where: {
              userId: existingUser.id,
              provider: "google",
            },
          });

          if (!existingAccount) {
            // Link Google account to existing user
            await db.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
              },
            });
          }

          return true;
        }
      }

      return true; // allow all other sign-ins by default
    },
  },
} satisfies NextAuthConfig;
