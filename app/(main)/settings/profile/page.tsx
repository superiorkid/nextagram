import getCurrentUser from "@/_actions/get-current-user";
import ChangeProfilePhoto from "@/components/change-profile-photo";
import EditProfileForm from "@/components/edit-profile-form";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Nextagram",
  description: "Edit your profile",
  openGraph: {
    title: "Profile | Nextagram",
    description: "Edit your profile",
    url: "http://localhost:3000/settings/profile",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return (
    <main className="mt-14 min-h-[15dvh] max-w-lg">
      <h1 className="text-xl font-medium">Edit Profile</h1>

      <div className="mt-8">
        <div className="flex items-center space-x-8">
          <div className="w-32 flex justify-end">
            <div className="relative h-10 w-10 mr-2.5">
              <Image
                fill
                src={
                  currentUser.image ??
                  `https://api.dicebear.com/7.x/micah/png?seed=${currentUser.email}`
                }
                alt={`${currentUser.name} photo`}
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          <div className="flex-1 leading-tight">
            <h3 className="font-black">{currentUser?.name}</h3>
            <ChangeProfilePhoto currentUser={currentUser} />
          </div>
        </div>
        <EditProfileForm currentUser={currentUser} />
      </div>
    </main>
  );
}

export default ProfilePage;
