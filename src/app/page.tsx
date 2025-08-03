import DashBoard from "@/components/DashBoard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if(!session) redirect("/api/signin")
  return (
    <div>
      {" "}
      <DashBoard id="" />
    </div>
  );
}
