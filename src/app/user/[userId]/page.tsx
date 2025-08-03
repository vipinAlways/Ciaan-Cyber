import User from "@/components/User";

interface Props {
  params: Promise<{ userId: string }>;
}
const page = async ({ params }: Props) => {
  const { userId } = await params;
  return (
    <div>
      <User id={userId} />
    </div>
  );
};

export default page;
