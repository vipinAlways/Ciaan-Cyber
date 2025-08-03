import User from "@/components/User";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ userId: string }>;
}
const page = async ({ params }: Props) => {
  const session = await auth()
  const { userId } = await params;

  if(!session) redirect("/api/signin")
  return (
    <div>
      <User id={userId} />
    </div>
  );
};

export default page;
