"use server";

import { db } from "@/lib/db";

export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        time: "desc", // Optional: latest posts first
      },
      include: {
        user: true,
        likes: {
          include: {
            user: true, // Gets user info for each like
          },
        },
        comments: {
          include: {
            user: true, // Gets user info for each comment
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
