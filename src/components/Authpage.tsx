"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Authpage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const req = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (req?.ok) {
      toast("welcome  ");
      redirect("/");
    }
  };
  return (
    <div className="w-3/5 h-screen flex items-center justify-center flex-col gap-5 sm:gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4  w-96 ">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 text-lg sm:text-xl focus:outline-green-400 outline rounded-xl px-4 "
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Passowrd"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 text-lg sm:text-xl focus:outline-green-400 outline rounded-xl px-4 "
        />
        <Button type="submit">Login</Button>
      </form>
      <hr className="w-96 h-1" />

      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="h-12 text-lg sm:text-xl flex items-center justify-center"
      >
        Google
      </Button>
    </div>
  );
};

export default Authpage;
