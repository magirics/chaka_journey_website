import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-screen flex-col">
        <Navbar />
        <main className="mx-auto flex max-w-250 grow flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
