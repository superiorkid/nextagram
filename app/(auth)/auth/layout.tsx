import AuthAnimation from "@/components/auth/auth-animation";
import Container from "@/components/container";
import Footer from "@/components/footer";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Container className="flex flex-col">
      <div className="flex-1 flex md:space-x-12 items-center px-14 md:px-3">
        <div className="flex-1 hidden md:flex">
          <AuthAnimation />
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </Container>
  );
};

export default AuthLayout;
