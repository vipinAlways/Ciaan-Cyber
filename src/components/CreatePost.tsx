"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  PlusIcon } from "lucide-react";
import { createPost } from "@/app/server/actions/Post";
import { toast } from "sonner";
import UploadPostImage from "./UploadButton";
import Image from "next/image";


const CreatePost = ({ id }: { id: string }) => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState<boolean>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post created!");
      queryClient.invalidateQueries({ queryKey: ["all posts"] });
      setCaption("");
      setImageUrl("");
      setOpen(false)
    },
    onError: () => {
      toast.error("Failed to create post.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("image are required.");
      return;
    }
    mutation.mutate({ image: imageUrl, caption: caption, id: id });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="flex items-center gap-1.5 p-4 text-2xl">
          <PlusIcon className="size-6" />
          <span>Add Post</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
          <textarea
            placeholder="Write a caption..."
            className="border rounded p-2"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="flex items-center flex-col ">
             <UploadPostImage onUpload={setImageUrl} />
          </div>
          {imageUrl && <Image height="150" width="100" src={imageUrl} alt="Uploaded" className="w-full rounded" />}
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
