"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const getComments = async (postId: string) => {
  try {
    const comments = await db.comments.findMany({
      where: { postId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching comments");
  }
};
export const getLikes = async (postId: string) => {
  try {
    const likes = await db.like.findMany({
      where: { postId },
      include: {
        user: true,
      },
    });

    return likes;
  } catch (error) {
    console.log('error', error)
    throw new Error("Error fetching comments");
  }
};

export const addComment = async ({
  content,
  postId,
}: {
  postId: string;
  content: string;
}) => {
  const session = await auth();
  const userEmail = session?.user.email;

  if (!userEmail) throw new Error("Not authenticated");

  const user = await db.user.findFirst({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  try {
    const newComment = await db.comments.create({
      data: {
        postId,
        userId: user.id,
        content,
      },
    });

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment");
  }
};

export const likePost = async (postId: string) => {
  const session = await auth();
  const userEmail = session?.user.email;

  if (!userEmail) throw new Error("Not authenticated");

  const user = await db.user.findFirst({
    where: { email: userEmail },
  });

  if (!user) throw new Error("User not found");

  const existingLike = await db.like.findFirst({
    where: {
      postId,
      userId: user.id,
    },
  });

  if (existingLike) {
    await db.like.delete({
      where: { id: existingLike.id },
    });
    return { liked: false };
  } else {
    await db.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });
    return { liked: true };
  }
};
