import getCurrentUser from "@/_actions/get-current-user";
import Container from "@/components/container";
import Footer from "@/components/footer";
import LogoutButton from "@/components/logout-button";
import ResendVerificationEmailButton from "@/components/resend-verification-email-button";
import jwt, { Secret } from "jsonwebtoken";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Email Verification | Nextagram",
  description: "Verify your email to continue using this",
  openGraph: {
    title: "Email Verification | Nextagram",
    description: "Verify your email to continue using this",
    url: "http://localhost:3000/verification",
    siteName: "Nextagram",
    locale: "en_US",
    type: "website",
  },
};

const EmailVerificationPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.emailVerified !== null) {
    redirect("/");
  }

  const token = jwt.sign(
    { email: currentUser?.email as string },
    process.env.NEXTAUTH_SECRET as Secret,
    {
      expiresIn: "1h",
    }
  );

  return (
    <Container className="pt-12">
      <main className="border p-10 max-w-lg mx-auto">
        <p className="pb-3">Dear {currentUser?.name},</p>
        <p className="py-2">Check your email to verify your account.</p>
        <div className="pt-4 space-y-2">
          <p className="text-sm">
            <span className="text-rose-500">*</span>You can resend verification
            email by clicking button below.
          </p>
          <ResendVerificationEmailButton
            token={token}
            toEmail={currentUser?.email as string}
            subject="User registration"
          />
        </div>
        <div className="absolute bottom-16 right-20">
          <LogoutButton />
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default EmailVerificationPage;
