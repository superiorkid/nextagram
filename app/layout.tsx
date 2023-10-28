import ToastProvider from "@/providers/toast-provider";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/providers/theme-provider";
import React from "react";

const helvetica = localFont({ src: "./Helvetica.woff2" });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "Nextagram",
  description: "Nextagram | Instagram Clone",
  openGraph: {
    images: [
      {
        url: "https://ik.imagekit.io/superiorkid/instagram-clone/assets/nextagram_logo.png?updatedAt=1695638400736",
        width: 800,
        height: 600,
      },
      {
        url: "https://ik.imagekit.io/superiorkid/instagram-clone/assets/nextagram_logo.png?updatedAt=1695638400736",
        width: 1800,
        height: 1600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={helvetica.className}>
        <ToastProvider />
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
