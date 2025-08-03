"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "@/app/server/actions/User";
import { toast } from "sonner";
import UploadUserImage from "./UploadUsetImage";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function EditUser({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setProfession(user.profesion ?? "");
      setBio(user.Bio ?? "");
      setImage(user.image ?? "");
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      redirect(`/user/${id}`)
    },
    onError: () => toast.error("Failed to update user"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    mutation.mutate({
      id: user.id,
      name,
      email,
      profesion: profession,
      Bio: bio,
      image,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <UploadUserImage onUpload={setImage} />

      {image && (
        <Image
          height={150}
          width={100}
          src={image}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
      )}

      <input
        type="text"
        placeholder="Name"
        value={name}
        className="border p-2 rounded"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profession"
        value={profession}
        className="border p-2 rounded"
        onChange={(e) => setProfession(e.target.value)}
      />
      <textarea
        placeholder="Bio"
        value={bio}
        className="border p-2 rounded"
        onChange={(e) => setBio(e.target.value)}
      />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
