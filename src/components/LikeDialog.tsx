"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2Icon, Cog } from "lucide-react";
import { addComment, getComments, likePost } from "@/app/server/actions/Comments";
import { useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/app/server/actions/Post";

const LikeDialog = (postId:string) => {
 
  const {
      data: posts,
      isLoading,
      error,
    } = useQuery({
      queryKey: ["all posts"],
      queryFn: getAllPosts,
    });
    console.log(posts.us);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CheckCircle2Icon className="size-4" />
          Comment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
        </DialogHeader>

        <div className="pt-4 max-h-60 overflow-y-auto text-sm text-muted-foreground">
          {posts?.map((c) => (
            <div key={c.id} className="border-t py-2">
              <Link href={`/user/${c.userId}`}>{c.user?.name || "User"}:</Link>{" "}
              {c.content}
            </div>
          ))}
        </div>
        <textarea
          className="w-full border rounded-md p-2"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => setComment("")}>
            Cancel
          </Button>
          <Button
            onClick={() => mutate({ content: comment, postId })}
            disabled={isPending}
            variant="default"
          >
            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LikeDialog;
