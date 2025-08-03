"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPosts } from "@/app/server/actions/Post";
import Image from "next/image";
import { CommentDialog } from "./CommetsDialog";
import { likePost } from "@/app/server/actions/Comments";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const DashBoard = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all posts"],
    queryFn: getAllPosts,
  });

  const like = useMutation({
    mutationKey: ["likePost"],
    mutationFn: likePost,
    onSuccess: () => {
      toast.success("Post liked");
      queryClient.invalidateQueries({ queryKey: ["all posts"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load posts.</p>;
  ;
  return (
    <div className="flex flex-col gap-5 items-center w-full py-5">
      {posts?.map((post) => (
        <div key={post.id} className="w-96 border p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={
                post.user.image && post.user.image !== ""
                  ? post.user.image
                  : "/nouserImage.webp"
              }
              alt="Post image"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />

            <span className="font-medium">
              {post.user?.name || "Anonymous"}
            </span>
          </div>
          <Image
            src={
              post.image && post.image !== '""'
                ? post.image
                : "/nouserImage.webp"
            }
            alt="Post Image"
            width={300}
            height={300}
            className="rounded-lg object-cover w-full h-auto border"
          />
          <p className="mt-2">{post.caption}</p>
          <div className="text-sm text-zinc-500 mt-1">
            <div className="flex gap-2 items-center">
              {post.comments.length} <CommentDialog postId={post.id} />
            </div>{" "}
            <div className="flex gap-2 items-center">
              ·{post.likes.length}{" "}
              <Heart
                className="size-5 text-red-500 cursor-pointer"
                onClick={() => like.mutate(post.id)}
              />
              likes
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashBoard;
