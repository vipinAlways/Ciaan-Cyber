"use client";

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
import { CheckCircle2Icon } from "lucide-react";
import { addComment, getComments } from "@/app/server/actions/Comments";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CommentDialogProps {
  postId: string;
}

export const CommentDialog = ({ postId }: CommentDialogProps) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-comment", postId],
    mutationFn: addComment,
    onSuccess: () => {
      toast.success("Comment added!");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: ({err}:{err:{message:string}}) => {
      toast.error(err.message || "Failed to add comment");
    },
  });

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
          {comments?.map((c) => (
            <div key={c.id} className="border-t py-2 flex items-center gap-1.5">
              <Image
                src={
                  c.user.image && c.user.image !== ""
                    ? c.user.image
                    : "/nouserImage.webp"
                }
                alt="user image"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />{" "}
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
