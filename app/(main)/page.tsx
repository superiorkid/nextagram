import Container from "@/components/container";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import Stories from "@/components/stories";
import UserCard from "@/components/user-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="max-w-screen-lg lg:px-3 pt-12 pb-6">
      <div className="min-h-screen flex justify-between space-x-14 flex-nowrap">
        <div className="flex-1 min-w-0 overflow-auto">
          <Stories />
          <div className="max-w-md mx-auto space-y-5 divide-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCard key={index} />
            ))}
          </div>
        </div>

        <div className="w-72 hidden lg:flex lg:flex-col pt-3">
          <div className="flex space-x-2.5 mb-6">
            <Image
              src="https://images.unsplash.com/photo-1514136649217-b627b4b9cfb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
              alt="profile photo"
              height={300}
              width={300}
              className="object-cover rounded-full w-12 h-12"
            />
            <div className="text-sm">
              <p className="font-bold tracking-wide">superiorkid</p>
              <p className="text-gray-500">mohammad.ilhamuddin@gmail.com</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm tracking-wide text-gray-500">
                Suggested for you
              </h4>
              <Link
                href="#seeall"
                className="text-xs font-bold tracking-wide hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="space-y-3.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <UserCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
