import { auth } from "@/auth";
import ProfileForm from "@/components/profile/profileform";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/user";

export const metadata = {
  title: "Profile | Dashboard",
  description: "Manage your profile settings and preferences",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const response = await getUserProfile(session.user.id as string);
  
  if (!response.success || !response.data) {
    return <div>Failed to load profile</div>;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:p-6">
          <ProfileForm user={response.data} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;