"use server";

import { db } from "@/lib/db";

export const getUser = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: { id: id },
    });

    if (!user) throw new Error("No user found");

    return user;
  } catch (error) {
    throw new Error(`Server error: ${error}`);
  }
};

export const updateUser = async ({
  id,
  name,
  email,
  profesion,
  Bio,
  image,
}: {
  id: string;
  name: string;
  email: string;
  profesion: string;
  Bio: string;
  image: string;
}) => {
  try {
    return await db.user.update({
      where: { id },
      data: {
        name,
        email,
        profesion,
        Bio,
        image,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
};
