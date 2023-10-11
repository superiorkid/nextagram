import ToastProvider from "@/providers/toast.provider";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { DetailPostDialogCtx } from "@/context/detail-post-dialog-ctx";

const helvetica = localFont({ src: "./Helvetica.woff2" });

export const metadata: Metadata = {
  title: "Nextagram",
  description: "Nextagram | Instagram Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={helvetica.className}>
        <DetailPostDialogCtx>
          <ToastProvider />
          {children}
        </DetailPostDialogCtx>
      </body>
    </html>
  );
}
