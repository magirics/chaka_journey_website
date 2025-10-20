import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from './../../../i18n/routing';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export const metadata: Metadata = {
  title: "",
  description: "",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  return (
    <html>
      <body className="flex min-h-screen w-screen flex-col">
        <NextIntlClientProvider>
          <Navbar />
          <main className="mx-auto flex max-w-250 grow flex-col items-center">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
