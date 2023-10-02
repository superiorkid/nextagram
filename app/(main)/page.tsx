import Container from "@/components/container";
import Footer from "@/components/footer";
import PostCard from "@/components/post-card";
import Stories from "@/components/stories";
import { SwiperSlide, Swiper } from "swiper/react";

export default function Home() {
  return (
    <Container className="max-w-screen-lg lg:px-3 pt-12 pb-6">
      <div className="min-h-screen flex justify-between space-x-3">
        <div className="flex-1">
          <div className="mb-6">stories</div>
          <div className="max-w-md mx-auto space-y-5 divide-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCard key={index} />
            ))}
          </div>
        </div>
        <div className="w-72 hidden lg:flex">right</div>
      </div>
      <Footer />
    </Container>
  );
}
