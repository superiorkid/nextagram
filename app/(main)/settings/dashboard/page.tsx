import getCurrentUser from "@/_actions/get-current-user";
import { redirect } from "next/navigation";
import { TiSocialInstagram } from "react-icons/ti";
import { SlUserFollowing } from "react-icons/sl";
import { GiShadowFollower } from "react-icons/gi";
import PostTable from "@/components/dashboard/post-table";
import { getUserStatistic } from "@/_actions/user.action";

async function DashboardPage() {
  const currentUser = await getCurrentUser();
  const statistics = await getUserStatistic();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return (
    <div className="max-w-screen-lg mx-auto py-12 space-y-7">
      <section className="grid grid-cols-4 basis-[200px] gap-6">
        <div className="border shadow-sm h-[118px] rounded-md p-5">
          <div className="flex justify-between">
            <span className="capitalize font-semibold text-sm tracking-wide">
              total post
            </span>
            <TiSocialInstagram className="w-5 h-5" />
          </div>
          <h1 className="mt-3 text-3xl font-black">
            {statistics?._count.posts}
          </h1>
        </div>
        <div className="border shadow-sm h-[118px] rounded-md p-5">
          <div className="flex justify-between">
            <span className="capitalize font-semibold text-sm tracking-wide">
              total following
            </span>
            <SlUserFollowing className="w-5 h-5" />
          </div>
          <h1 className="mt-3 text-3xl font-black">
            {statistics?._count.following}
          </h1>
        </div>
        <div className="border shadow-sm h-[118px] rounded-md p-5">
          <div className="flex justify-between">
            <span className="capitalize font-semibold text-sm tracking-wide">
              total followers
            </span>
            <GiShadowFollower className="w-5 h-5" />
          </div>
          <h1 className="mt-3 text-3xl font-black">
            {statistics?._count.followers}
          </h1>
        </div>
      </section>

      <PostTable />
    </div>
  );
}

export default DashboardPage;
