"use client";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { createUser } from "./action";
import { toast } from "sonner";
const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 

  const mutation = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: () => {
      toast("Welcome");
      redirect("/")
    },
    onError: (err) => {
      toast(err.message);
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutation.mutate({ email, name, password });
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-3/5 h-screen flex items-center justify-center flex-col gap-5 sm:gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96 ">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-lg sm:text-xl focus:outline-green-400 outline rounded-xl px-4 w-full  "
          />
          <input
            type="name"
            name="name"
            placeholder="Enter Your name"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="h-12 text-lg sm:text-xl focus:outline-green-400 outline rounded-xl px-4 w-full  "
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Your Passowrd"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 text-lg sm:text-xl focus:outline-green-400 outline rounded-xl px-4 w-full  "
          />
          <Button>create user</Button>
        </form>
        <hr className="w-full h-1" />

        <Button onClick={() => signIn("google", { callbackUrl: "/" })} className="h-12 text-lg sm:text-xl flex items-center justify-center">
          Google
        </Button>
      </div>
    </div>
  );
};

export default Page;
