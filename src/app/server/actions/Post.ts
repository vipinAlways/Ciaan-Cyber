"use server";

import { db } from "@/lib/db";

export const getAllPosts = async (id?: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        userId:id ? id : undefined
      }, 
      orderBy: {
        time: "desc",
      },
      include: {
        user: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Server error while fetching posts");
  }
};

export async function createPost({
  caption,
  image,
  id,
}: {
  caption: string;
  image: string;
  id: string;
}) {
  if (!id) throw new Error("User not found");

  return await db.post.create({
    data: {
      caption: caption,
      image: image,
      userId: id,
      time: new Date(),
    },
  });
}
