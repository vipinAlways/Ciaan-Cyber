"use server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export const getUser = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  try {
    const user = await db.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user) throw new Error("No user found");

    return user;
  } catch (error) {
    throw new Error(`Server error: ${error}`);
  }
};
