import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/theme/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <Navbar />

          <Container className="py-16">{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
