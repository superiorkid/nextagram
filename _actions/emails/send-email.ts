"use server";

import EmailVerification from "@/components/emails/email-verification";
import { render } from "@react-email/render";
import nodemailer, { SendMailOptions } from "nodemailer";
import getCurrentUser from "@/_actions/get-current-user";

export async function sendMail({
  subject,
  toEmail,
  token,
}: {
  subject: string;
  toEmail: string;
  token: string;
}) {
  const currentUser = await getCurrentUser();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const emailHtml = render(
    EmailVerification({ name: currentUser?.name as string, token: token })
  );

  const mailOptions: SendMailOptions = {
    subject,
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    html: emailHtml,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
