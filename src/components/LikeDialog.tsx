"use client";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon } from "lucide-react";
import { getLikes } from "@/app/server/actions/Comments";

import Link from "next/link";

import Loading from "./Loading";
import Image from "next/image";

const LikeDialog = ({ postId }: { postId: string }) => {
  const {
    data: likes,
    isLoading,
   
  } = useQuery({
    queryKey: ["all likes"],
    queryFn: () => getLikes(postId),
  });
  if (isLoading) {
    <Loading />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CheckCircle2Icon className="size-4" />
          Likes
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
        </DialogHeader>

        <div className="pt-4 max-h-60 overflow-y-auto text-sm text-muted-foreground">
          {likes?.map((c) => (
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
              <Link href={`/user/${c.userId}`}>{c.user?.name || "User"}</Link>{" "}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikeDialog;
