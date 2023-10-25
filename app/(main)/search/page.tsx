import getCurrentUser from "@/_actions/get-current-user";
import Container from "@/components/container";
import Search from "@/components/search";
import { redirect } from "next/navigation";

async function SearchPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.emailVerified) {
    redirect("/verification");
  }

  return (
    <Container className="min-h-screen max-w-lg lg:pt-14">
      <Search />
    </Container>
  );
}

export default SearchPage;
