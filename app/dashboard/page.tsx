import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="text-2xl"> Hi {session?.user.name}!
      </h1>
    </div>
  );
};

export default DashboardPage;
