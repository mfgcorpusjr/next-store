import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/header/Navbar";
import Container from "@/components/Container";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next Store",
    template: "%s | Next Store",
  },
  description: "Next generation e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />

        <Container className="py-16">{children}</Container>
      </body>
    </html>
  );
}
