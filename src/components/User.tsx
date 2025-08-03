"use client";
import { getUser } from "@/app/server/actions/User";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Loading from "./Loading";
import CreatePost from "./CreatePost";
import DashBoard from "./DashBoard";
import { EditIcon } from "lucide-react";
import { useSession } from "next-auth/react";

const User = ({ id }: { id: string }) => {
  const session = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["use-auth"],
    queryFn: () => getUser(id),
  });

  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Image
              src={data?.image?.trim() ? data.image : "/nouserImage.webp"}
              height={60}
              width={60}
              alt="userImage"
              className="rounded-full object-cover"
            />
            <Link href={`/user/${data.id}`} className="text-3xl font-medium">
              {data.name}
            </Link>
          </div>
          {session.data?.user.id === id && (
            <Link
              href={`/user/Edit/${data.id}`}
              className="text-xl font-medium flex items-center"
            >
              Edit <EditIcon className="size-5" />
            </Link>
          )}
        </div>

        <div className="sm:gap-7 gap-3 max-md:flex-col flex ">
          <div className="flex flex-col gap-3 justify-center items-start">
            <div className="flex items-start max-md:flex-col gap-1.5 text-lg justify-start">
              <label htmlFor="profession" className=" font-bold">
                Profession :
              </label>
              <h3
                id="profession"
                className="bg-zinc-400/30 border-green-400 px-4 py-1  rounded-xl "
              >
                {data.profesion ?? ""}{" "}
              </h3>
            </div>
            <div className="flex items-start max-md:flex-col gap-1.5 text-lg">
              <label htmlFor="bio" className="font-bold">
                Bio :
              </label>
              <h3
                id="bio"
                className="bg-zinc-400/30 border-green-400 px-4 py-1 text-sm rounded-xl "
              >
                {data.Bio??""}{" "}
              </h3>
            </div>
          </div>

          {session.data?.user.id === id && (
            <div className="flex items-center justify-center">
              <CreatePost id={id} />
            </div>
          )}
        </div>

        <DashBoard id={id} />
      </div>
    </div>
  );
};

export default User;
