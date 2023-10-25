"use client";

import { sendMail } from "@/_actions/emails/send-email";
import { cn } from "@/lib/utils";
import { FormEvent, useTransition } from "react";
import toast from "react-hot-toast";

interface Props {
  subject: string;
  toEmail: string;
  token: string;
}

function ResendVerificationEmailButton({ toEmail, subject, token }: Props) {
  const [isPending, startTrantision] = useTransition();

  const handleResendEmailVerification = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTrantision(async () => {
      await sendMail({ subject, toEmail, token })
        .then(() => {
          toast.success("Sending new email verification to your email");
        })
        .catch((error) => {
          toast.error("failed to resend new email verfication");
        });
    });
  };

  return (
    <form onSubmit={handleResendEmailVerification}>
      <button
        className={cn(
          "bg-sky-400 w-full py-1.5 rounded-md text-white hover:bg-sky-500 font-medium tracking-wide duration-500 transition-all text-sm",
          isPending && "bg-gray-300 hover:bg-gray-400"
        )}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Resend Verification Email"}
      </button>
    </form>
  );
}

export default ResendVerificationEmailButton;
