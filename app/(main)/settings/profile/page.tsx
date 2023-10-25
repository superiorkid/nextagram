import getCurrentUser from "@/_actions/get-current-user";
import ChangeProfilePhoto from "@/components/change-profile-photo";
import EditProfileForm from "@/components/edit-profile-form";
import Image from "next/image";
import { redirect } from "next/navigation";
import { RxAvatar } from "react-icons/rx";

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
            {currentUser?.image ? (
              <div className="relative h-10 w-10 mr-2.5">
                <Image
                  fill
                  src={currentUser.image}
                  alt={`${currentUser.name} photo`}
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <RxAvatar className="w-10 h-10 inline mr-2.5" />
            )}
          </div>
          <div className="flex-1 leading-tight">
            <h3 className="font-black">{currentUser?.name}</h3>
            <ChangeProfilePhoto />
          </div>
        </div>
        <EditProfileForm currentUser={currentUser} />
      </div>
    </main>
  );
}

export default ProfilePage;
