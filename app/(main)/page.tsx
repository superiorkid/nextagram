import Container from "@/components/container";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <Container className="max-w-screen-lg px-16">
      <div className="min-h-screen flex justify-between space-x-5">
        <div>left</div>
        <div>right</div>
      </div>
      <Footer />
    </Container>
  );
}
