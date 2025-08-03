import Authpage from "@/components/Authpage";
import Image from "next/image";
import { auth } from "./api/auth/[...nextauth]/route";
import DashBoard from "@/components/DashBoard";

export default async function Home() {
  const Session = await auth();

  if (!Session)
    return (
      <div className="w-full flex items-center justify-center">
        <Authpage />
      </div>
    );
  console.log(Session);
  return (
    <div>
      {" "}
      <DashBoard />
    </div>
  );
}
