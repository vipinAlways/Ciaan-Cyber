import EditUser from "@/components/EditUser";


interface Props {
  params: Promise<{ userId: string }>;
}
const page = async ({ params }: Props) => {
  const { userId } = await params;
  return (
    <div className="w-full flex items-center justify-center">
      <EditUser id={userId} />
    </div>
  );
};

export default page;
