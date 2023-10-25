import getCurrentUser from "@/_actions/get-current-user";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return <div>dashboard page</div>;
}

export default DashboardPage;
