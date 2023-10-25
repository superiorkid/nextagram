import getCurrentUser from "@/_actions/get-current-user";
import Container from "@/components/container";
import Search from "@/components/search";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Nextagram | instagram clone",
  description: "Search user",
  openGraph: {
    title: "Search Nextagram | instagram clone",
    description: "Search user",
    url: "http://localhost:3000/search",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

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
