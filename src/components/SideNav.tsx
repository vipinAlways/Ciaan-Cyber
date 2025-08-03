"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "./ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/server/actions/User";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const SideNav = () => {
  const session = useSession();
  const { data } = useQuery({
    queryKey: ["use-auth"],
    queryFn: () => getUser(session?.data?.user.id ?? ""),
  });
  if(!data) return null
  return (
    <Sidebar className="w-64">
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link
          href={"/"}
          className="flex items-center gap-4 border-b-2 pt-2 pb-4"
        >
          <p className="text-2xl font-semibold">Vipin LinkedIn</p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="border-b-2 pt-2 pb-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <Image
                    src={data?.image?.trim() ? data.image : "/nouserImage.webp"}
                    height={30}
                    width={30}
                    alt="userImage"
                    className="rounded-full object-cover"
                  />
                  <Link
                    href={`/user/${data.id}`}
                    className="text-xl font-medium"
                  >
                    {data.name}
                  </Link>
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex items-start flex-col gap-1.5 text-lg justify-start">
                <label htmlFor="profession" className=" font-bold">
                  Profession
                </label>
                <h3
                  id="profession"
                  className="bg-zinc-400/30 border-green-400 px-4 py-1  rounded-xl "
                >
                  {data.profesion ?? ""}{" "}
                </h3>
              </div>
              <div className="flex items-start flex-col gap-1.5 text-lg">
                <label htmlFor="bio" className="font-bold">
                  Bio
                </label>
                <h3
                  id="bio"
                  className="bg-zinc-400/30 border-green-400 px-4 py-1 text-sm rounded-xl "
                >
                  {data.Bio ?? ""}
                </h3>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="text-zinc-100">
        <Button onClick={() => signOut()}>Log out</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
