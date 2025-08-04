"use server";

import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

interface Props {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: Props) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (existingUser) throw new Error("User already registered");

    const hashPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const auth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (auth?.ok) {
      redirect("/");
    }
  } catch (error) {
    console.error("User creation error:", error);
    throw new Error("Server error");
  }
};
